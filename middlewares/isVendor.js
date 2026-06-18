module.exports = function(req,res,next){
    if(req.user.isVendor){
        next();
    }else{
        req.flash("error", "Only vendors can access this page");
        res.redirect("/shop");
    }
}