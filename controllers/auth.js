const data = require("../DataBase/users.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

exports.register = (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../DataBase', 'users.json'), 'utf-8'));
    if (data.users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'This ID already exists' });
    }

    // Store user data
    data.users.push({ username, password });
    fs.writeFileSync(path.join(__dirname, '../DataBase', 'users.json'), JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Your account has been created successfully' });
};


exports.login = async (req, res) => {

    const authHeader = req.headers.authorization;
    //Vérification que le header est bien un Basic Auth
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json("Basic authentication required");
    }

    //Récupération et vérification des données saisie pour l'identification
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString();
    const [username, password] = decodedCredentials.split(':');

    //Récupération de l'utilisateur
    const users = data.users;
    const user = users.find(usr => usr.username === username );
    if (!user) {
        return res.status(401).json("Incorrect username");
    }

    //Vérification de la validité du mot de passe
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json("Incorrect password")
    }

    //Émission du jwt
    const token = jwt.sign({ sub: user.username }, data.jwtKey, { expiresIn: "1h"});

    //Inscription du jwt dans la base de donnée
    if (saveJWT(user, token)) {
        return res.json("JWT token sucessfully created and saved");
    } else {
        return res.status(500).json("Error when saving token");
    }

};


const saveJWT = (user, token) => {
    if (user) {
        user.jwt = token;
        fs.writeFileSync(path.join(__dirname, "../data", "users.json"), JSON.stringify(data, null, 2));
        return true;
    }
    return false;
};

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (e) {
        console.error("Error while comparing passwords", e);
        return false;
    }
}