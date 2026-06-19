const userModel = require("../models/user-model");

module.exports = async function(req,res,next){
    let user = await userModel.findById(req.user._id);

    if(user && user.isVendor){
        return next();
    }else{
        return res.send("Only vendors can access this page");
    }
}