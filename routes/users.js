// var express = require('express');
// var router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const UserController = require('../controllers/user');
var router = global.router;

/* GET users listing. */
router.get("/get-users", UserController.get_users);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/user/:userId", checkAuth, UserController.user_delete);

module.exports = router;
