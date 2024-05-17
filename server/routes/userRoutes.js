const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

///Register
router.post("/register", userControllers.registerUser);

///Login
router.post("/login", userControllers.registerUser);
