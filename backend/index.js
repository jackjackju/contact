const express = require('express');
const app = express();
const cors = require("cors");

const authRoutes =  require('./routes/auth');
const dashBoardRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/verifyToken');

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/user", authRoutes);

// protected with token
app.use("/api/dashboard", verifyToken, dashBoardRoutes);

const pool = require("./db");

app.listen(5000, console.log('App running'));


