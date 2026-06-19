const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const vendorModel = require("../models/vendor-model");
const userModel = require("../models/user-model");
const isLoggedin = require("../middlewares/isLoggedin");
const isVendor = require("../middlewares/isVendor");

router.get("/", function (req, res) {
    res.send("hey it's working");
});

router.get("/product", isLoggedin, isVendor, async function(req,res){
    let products = await productModel.find();
    res.render("products", { products });
});

router.get("/becomeVendor", isLoggedin, function(req,res){
    res.render("becomeVendor", {
        error: req.flash("error"),
        success: req.flash("success")
    });
});

router.post("/becomeVendor", isLoggedin, async function(req,res){
    try{
        let { key } = req.body;

        let vendorKey = await vendorModel.findOne({ key });

        if(!vendorKey){
            req.flash("error", "Invalid vendor key");
            return res.redirect("/owners/becomeVendor");
        }

        if(vendorKey.used){
            req.flash("error", "This vendor key is already used");
            return res.redirect("/owners/becomeVendor");
        }

        await userModel.findByIdAndUpdate(req.user._id, {
            isVendor: true
        });

        vendorKey.used = true;
        vendorKey.usedBy = req.user._id;
        await vendorKey.save();

        req.flash("success", "You are now a vendor");
        res.redirect("/owners/product");

    }catch(err){
        res.send(err.message);
    }
});

module.exports = router;