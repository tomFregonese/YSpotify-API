const express = require('express')
//const jwt = require('jsonwebtoken')

const app = express()
const port = 3000

const fs = require('fs');
const path = require('path');

const authRoutes = require("./routes/auth");

app.use(express.json());

app.use(authRoutes);

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, './DataBase', 'users.json'), 'utf-8'));
    if (users[username]) {
        return res.status(400).json({ error: 'This ID already exists' });
    }

    // Store user data
    users[username] = { password };
    fs.writeFileSync(path.join(__dirname, './DataBase', 'users.json'), JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'Your account has been created successfully' });
});


app.listen(port, () => {
    console.log(`API running : localhost:${port}`)
})

