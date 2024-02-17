const jwt = require("jsonwebtoken");
const jwtKey = require("../DataBase/users.json").jwtKey;

exports.authenticateJwtToken = (req, res, next) => {

    //Vérification du header authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("JWT token missing or invalid");
    }

    //Récupération du JWT token et vérification de son existence
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json("Access denied: JWT token format invalid");
    }

    //Authentification du JWT token
    jwt.verify(token, jwtKey, (err, decodedToken) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json("Access denied: JWT token expired");
            } else {
                return res.status(401).json("Access denied: JWT token invalid");
            }
        }
        res.user = decodedToken;
        next();
    });
};