function getUsers() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '../DataBase', 'users.json'), 'utf-8').users);
}
const fs = require("fs");
const path = require("path");
const querystring = require('querystring');
const axios = require('axios');
const uuid = require('uuid');

const clientCredentials = require('../environments/client-credentials.json');
const redirect_uri = 'http://localhost:3000/callback/';

let stateStore = {};

exports.authUrl = (req, res) => {
    const scope = 'user-read-private user-read-email';
    const state = uuid.v4();

    stateStore[state] = req.user.sub;

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientCredentials.id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
};


exports.callback = (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (code && state) {
        const username = stateStore[state];
        //verify if the user exists
        const users = getUsers();
        const user = users.find(usr => usr.username === username);
        if (!user) {
            return res.status(401).json("User not found");
        } else {
            delete stateStore[state];
            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (Buffer.from(clientCredentials.id + ':' + clientCredentials.secret).toString('base64'))
                },
                json: true
            };

            axios.post(authOptions.url, authOptions.form, {
                headers: authOptions.headers
            }).then((response) => {
                const data = response.data;
                //save the token in the user object
                user.token = data.access_token;
                user.refreshToken = data.refresh_token;
                //update the user in the database
                const usersData = require("../DataBase/users.json");
                const userIndex = usersData.users.findIndex(usr => usr.username === username);
                usersData.users[userIndex] = user;
                fs.writeFileSync(path.join(__dirname, '../DataBase/users.json'), JSON.stringify(usersData, null, 2));
                res.json(data);
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}
