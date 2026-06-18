const bcrypt = require("bcrypt");

const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

const registerUser = async function (req, res) {
    try {
        let { email, password, fullname,isVendor } = req.body;

        if (!email || !password || !fullname ) {
            return res.send("All fields are required");
        }

        let user = await userModel.findOne({ email });

        if (user) {
           req.flash("error", "User already exists");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.send(err.message);

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);

                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname,
                    isVendor,
                });

                let token = generateToken(user);

                res.cookie("token", token);
                res.redirect("/shop");
            });
        });

    } catch (err) {
        res.send(err.message);
    }
};

const loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.send("Email or password incorrect");
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            req.flash("error", "Email or password incorrect");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return res.send(err.message);

            if (!result) {
                return res.send("Email or password incorrect");
            }

            let token = generateToken(user);

            res.cookie("token", token);
            res.redirect("/shop");
        });

    } catch (err) {
        res.send(err.message);
    }
};

const logoutUser = async function (req, res) {
    try {
        res.cookie("token", "");
        req.flash("success", "Logged out successfully");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;