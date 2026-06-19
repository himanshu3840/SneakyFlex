const express = require("express");
const router = express.Router();
const multer = require("multer");
const productModel = require("../models/product-model");

const storage = multer.memoryStorage();
//image ko hold karne ke liye intial phase me 
//disk storage ke liye public folder me images folder banao aur usme images daaldo and then acces it as we did in previous project
const upload = multer({ storage });

router.post("/create", upload.single("image"), async function(req,res){

    try{
        if(!req.file){
            return res.status(400).send("Image is required");
        }

        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer.toString("base64"), 

            // ye isliye kyki jo image hoti hai wo binary me hoti hai
            // phir ham use buffer me convert karte hai 
            // and then to some string of base 64 
            // and finally store that string in image

            name: name.trim(),
            price: Number(price),
            discount: Number(discount) || 0,
            bgcolor,
            panelcolor,
            textcolor

        });

        //gyan ke liye jaan lo ki
        //agar koi dusri property access karna chahe to wo error nahi dega bulki undefined dega

        req.flash("success","Product created successfully.");
        res.redirect("/shop");

    }catch(err){
        res.status(500).send(err.message);
    }

});

module.exports = router;