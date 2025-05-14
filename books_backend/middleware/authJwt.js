const jwt = require('jsonwebtoken');
require('dotenv').config()
const {User, Role} = require("../models")

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            include: [{
                model: Role,
                as: 'role'
            }]
        })
        console.log(user);
        
        if (!user || !user.role) {
            return res.status(403).send({
            message: "User role not found."
        });
        }
        if (user.role.name !== "admin") {
            return res.status(403).send({
            message: "Require Admin Role!"
            });
        } 
        next();
    } catch (error) {
        console.error("isAdmin error:", error);
        res.status(500).send({
        message: "Internal server error"
        });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt;