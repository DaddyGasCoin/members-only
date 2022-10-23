var express = require('express');
var router = express.Router({ mergeParams: true });

const user_controller = require('../controllers/userController')
const message_controller = require('../controllers/messageController')
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

//GET request to create message
router.get('/message-create', message_controller.message_create_get)

//POST request to create message
router.post('/message-create', message_controller.message_create_post)



module.exports = router;
