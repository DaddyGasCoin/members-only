var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

// GET request for creating a user
router.get('/sign-up', user_controller.user_create_get)

//POST request for creating user
router.post('/sign-up', user_controller.user_create_post)

//GET request for user logout
router.get('/log-out', user_controller.user_logout)

// //POST request for user login
// router.post('/sign-in', user_controller.user_login_post)





module.exports = router;
