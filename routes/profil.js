const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const fs = require("fs");
const { authenticate}= require("../Public/js/auth.js")


router.use(cookieParser());
router.get("/",authenticate, (req, res) => {
  const loggedInUser =  req.cookies.user;
  res.render("profil",{user:loggedInUser.username});
  

});
router.get("/logout",(req,res)=>{
  console.log()
  res.clearCookie("auth"); 
  res.clearCookie("user")
  res.redirect("/signin"); 
});
module.exports = router;
