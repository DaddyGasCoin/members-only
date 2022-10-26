var express = require('express');
var router = express.Router({ mergeParams: true });

const user_controller = require('../controllers/userController')
const message_controller = require('../controllers/messageController')

/* GET home page. */
router.get('/', message_controller.message_list)
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

//GET request to change member status
router.get('/member-status', user_controller.user_member_add_get)

//POST request to change member status
router.post('/member-status', user_controller.user_member_add_post)

//GET request to change admin status
router.get('/admin-status', user_controller.user_admin_add_get)

// POST request to change member status
router.post('/admin-status', user_controller.user_admin_add_post)

//GET request to change admin status
router.get('/login', user_controller.user_login_get)

// GET request to delete champion.
router.get("/message/delete/:id", message_controller.message_delete_get);

// POST request to delete champion
router.post("/message/delete/:id", message_controller.message_delete_post)
module.exports = router;
