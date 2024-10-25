
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressErr = require("../utils/ExpressErr.js");
const Contect=require("../models/contect-form.js");
const {isLoggedIn}=require("../middleware.js")

 

const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

router.post("/signup",wrapAsync(async(req, res, next) => {
        try {
            let { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const resisterUser = await User.register(newUser, password);
            console.log(resisterUser);
            req.login(resisterUser,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash("success", "New  user signUped");
                res.redirect("/");
            })
        } catch (e) {
            req.flash("error","email or user name alredy exit please try another email!");
            
            res.redirect("/signup");
        }
    }));
router.get("/login", (req, res) => {
    res.render("login.ejs");
});
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureMessage: "login failed",
    }),
   wrapAsync(async(req, res, next) => {  req.flash("success", " user logined successfully");
    req.flash("success", " user logined successfully");
        res.redirect("/");
    }
));
router.get('/auth/google',
    passport.authenticate('google', { scope: 
        ['email' ,'profile'] }));
  
  router.get('/auth/google/callback', 
    passport.authenticate('google',
         {
            // successRedirect: '/auth/google/success',
            failureRedirect: '/login' }),
    async(req, res)=> {
    
        // Successful authentication, redirect home.
        req.flash("success", " user logined successfully via google" );
        res.redirect('/');
    });
// router.get('/auth/google/success',(req, res)=>{
//     res.send("hello thre")
// })
router.get("/logout", (req,res,next) =>{
    console.log("logout user is: " ,req.user)
    req.logout((err)=>{
       
        if(err) {
           return next(err);
        }
         req.flash("success","user logged out!");
        return res.redirect("/");
    })
})
router.post("/contect",isLoggedIn,async(req,res)=>{
    try {
        const contect = new Contect(req.body);
        await contect.save();
        req.flash("success","Your form has submitted!");
        res.redirect("/");
        console.log(contect);
        // res.status(201).send({ message: 'Form submitted successfully' });
      } catch (error) {
        res.status(500).send({ message: 'Error submitting form' });
      }
    });



module.exports = router;
