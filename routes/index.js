const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedin = require("../middlewares/isLoggedin");
const userModel = require("../models/user-model");

router.get("/", function(req,res){
    res.render("login");
});

router.get("/register", function(req,res){
    res.render("register");
});

router.get("/shop", isLoggedin, async function(req,res){
    let products = await productModel.find();

    res.render("shop", {
        products,
        user: req.user
    });
});

router.post("/cart/add/:id", isLoggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });

    user.cart.push(req.params.id);
    await user.save();

    req.flash("success", "Product added to cart successfully!");
    res.redirect("/shop");
});

router.get("/cart", isLoggedin, async function(req, res) {

    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    res.render("cart", {
        cart: user.cart
    });

});

module.exports = router;