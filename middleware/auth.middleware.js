require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyToken = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.headers)
    if (req.headers["authorization"] && req.headers["authorization"].startsWith("Bearer")
    ) {
        try {
            token = req.headers["authorization"].split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");
            // console.log(req.user)
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid authorization token" });
        }
    }
    if (!token) {
        res.status(401).json({ message: "User not authorized" });
    }
});

module.exports = { verifyToken };