const Message = require('../models/message')
const { body, validationResult } = require("express-validator");

// Display list of all messages.
exports.message_list = (req, res) => {
    // res.send("NOT IMPLEMENTED: message list");
    Message.find({})
        .populate('user')
        .exec(function (err, messages) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            console.log(req.user)
            res.render("index", { user: req.user, messages: messages });
        });
};

// Display message create form on GET.
exports.message_create_get = (req, res) => {
    // res.send("NOT IMPLEMENTED: message create GET");
    res.render("message-create-form", { user: req.user })
};

// Handle message create on POST.
exports.message_create_post = [
    body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
    body("message", "Message required").trim().isLength({ min: 1 }).escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a genre object with escaped and trimmed data.
        const message = new Message({
            title: req.body.title,
            date: new Date,
            data: req.body.message,
            user: req.user._id,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("message_create_form", {
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            //Save message
            message.save((err) => {
                if (err) {
                    console.log(err)
                    return next(err);
                }
                res.redirect('/');
            });
        }
    },
]

