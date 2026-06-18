const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(
            req.cookies.token,
            process.env.JWT_KEY
        );

        // decoded me email and id aa jayega
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");

        // password hata diya
        req.user = user;

        next();

    } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
};