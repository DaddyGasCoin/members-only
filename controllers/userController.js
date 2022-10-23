const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require("express-validator");


// Display user create form on GET.
exports.user_create_get = (req, res) => {
    res.render("sign-up-form", { user: req.user })
};

// Handle user create on POST.
exports.user_create_post = [
    body("firstname", "first name required").trim().isLength({ min: 1 }).escape(),
    body("lastname", "Last name required").trim().isLength({ min: 1 }).escape(),
    body("username", "User name required").trim().isLength({ min: 1 }).escape(),
    body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
    body("confirmpassword", "Passwords do no match").trim().isLength({ min: 1 }).escape().
        custom((value, { req, loc, path }) => {
            if (value !== req.body.password) {
                // throw error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),

    (req, res) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log(errors.array())
            res.render("sign-up-form", {
                errors: errors.array(),
            });
            return;
        }
        // Data from form is valid.
        else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    return next(arr)
                }
                // otherwise, store hashedPassword in 
                const user = new User({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    password: hashedPassword
                }).save(err => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect("/");
                });
            });
        }
    }
]


exports.user_logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}