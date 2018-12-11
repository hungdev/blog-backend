// var express = require('express');
// var router = express.Router();
var router = global.router;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import checkAuth from '../middleware/checkAuth'

const User = require("../models/user");
const UserController = require('../controllers/user');

/* GET users listing. */
router.get("/get-users", UserController.get_users);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/user/:userId", checkAuth, UserController.user_delete);

module.exports = router;
