const jwt = require('jsonwebtoken');
const {searchUser, searchUserID} = require("../queries/UserQuery");
require('dotenv').config()

// Middleware to validate token
const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  if(!token){
    return res.status(401).json({error: "Access Denied"});
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let rows = await searchUserID(req.body.user_id);

    if (rows.length !== 1){
      return res.status(400).json({message: "User not found"});
    }

    if (rows[0].username !== verified.username){
      return res.status(400).json({message: "Incorrect user id"});
    }

    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({error: "Token is not valid. Please logout and login again!"});
  }
};

module.exports = verifyToken;
