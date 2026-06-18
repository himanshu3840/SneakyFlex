const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", function(req,res){
    res.render("login");
});

router.get("/register", function(req,res){
    res.render("register");
});

router.get("/shop", isLoggedIn, async function(req,res){
    let products = await productModel.find();

    res.render("shop", {
        products,
        user: req.user
    });
});

module.exports = router;