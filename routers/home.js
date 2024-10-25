const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const {isLoggedIn}=require("../middleware.js")

router.get("/home",(req,res)=>{
     res.render("home.ejs")
})
router.get("/index",(req,res)=>{
    res.render("index.ejs")
})
router.get("/feature",(req,res)=>{
    res.render("nav/feature.ejs")
})
router.get("/blog",(req,res)=>{
    res.render("nav/blog.ejs")
})
router.get("/support",(req,res)=>{
    res.render("nav/support.ejs")
})
router.get("/working",(req,res)=>{
    res.render("nav/working.ejs")
})
router.get("/contact",(req,res)=>{
    res.render("nav/contact.ejs")
})
router.get("/bluetooth",isLoggedIn,(req,res)=>{
    res.render("bluetooth.ejs")
})

module.exports = router;