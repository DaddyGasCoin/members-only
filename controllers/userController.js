const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require("express-validator");


// Display user create form on GET.
exports.user_login_get = (req, res) => {
    res.render("login-form")
};

// Display user create form on GET.
exports.user_create_get = (req, res) => {
    res.render("sign-up-form")
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

//Diplay Member staus from on GET
exports.user_member_add_get = (req, res) => {
    res.render('member_form', { user: req.user })
}

//Member status form on POST
exports.user_member_add_post = [
    body("key", "Key is required").trim().isLength({ min: 1 }).escape(),
    body("key", "Incorrect key").trim().escape().equals('secret'),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("member_form", {
                user: req.user,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            //UPDATE MEMBERSHIP STATUS
            User.findByIdAndUpdate(req.user._id,
                { membershipstatus: !req.user.membershipstatus },
                {},
                function (err) {
                    if (err) {
                        return next(err);
                    }
                    // Successful - redirect to home page
                    res.redirect('/');
                })
        }
    },
]

//Diplay admin staus from on GET
exports.user_admin_add_get = (req, res) => {
    res.render('admin_form', { user: req.user })
}

//Display admin status form on POST
exports.user_admin_add_post = [
    body("key", "Key is required").trim().isLength({ min: 1 }).escape(),
    body("key", "Incorrect key").trim().escape().equals('secret'),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("admin_form", {
                user: req.user,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            //Update admin status
            User.findByIdAndUpdate(req.user._id,
                { admin: !req.user.admin },
                {},
                function (err) {
                    if (err) {
                        return next(err);
                    }
                    // Successful - redirect to home page
                    res.redirect('/');
                })
        }
    },
]