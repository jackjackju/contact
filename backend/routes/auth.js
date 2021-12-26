const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const pool = require("../db");
const {searchUser, insertUser} = require("../queries/UserQuery");
require('dotenv').config()


//Sign Up Route
router.post("/register", async (req, res) => {
    try{
        let rows = await searchUser(req.body.username);
        if (rows.length !== 0){
            return res.status(400).json({message: "User exists"});
        }
        await insertUser(req.body.username, req.body.password, req.body.email);

        rows = await searchUser(req.body.username);
        if (rows.length !== 1){
            return res.status(500).json({message: "Database error"});
        }
        return res.status(200).json({message: "Success", user_id: rows[0].user_id, token: jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE})});
    }
    catch (err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
});


// Login Route
router.post("/login", async (req, res) => {
    try{
        let rows = await searchUser(req.body.username);
        if (rows.length !== 1){
            return res.status(400).json({message: "User not found"});
        }

        if (rows[0].password !== req.body.password){
            return res.status(400).json({message: "Incorrect password"});
        }
        return res.status(200).json({message: "Success", user_id: rows[0].user_id, token: jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFE})});
    }
    catch (err){
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
});

module.exports = router;
