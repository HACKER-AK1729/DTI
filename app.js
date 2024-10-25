
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const cookieParser = require("cookie-parser");

const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressErr = require("./utils/ExpressErr");

const methodOverride = require("method-override");

const userRouter = require("./routers/user.js");
const session = require("express-session");
const mongoStore= require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const homeRouter=require("./routers/home.js")
const bodyParser = require('body-parser');
// const {storage} =require("./cloudinary.js");
const fs =require("fs");
const { isLoggedIn } = require("./middleware.js");
const MongoStore = require("connect-mongo");




require("dotenv").config();
require("./auth");





const PORT= process.env.PORT


const MONGO_UR =process.env.MONGO_URL;
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    return await mongoose.connect(MONGO_UR);
}

const store=MongoStore.create({
    mongoUrl:MONGO_UR,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error",()=>{
    console.log("ERROR mongo session strore",err);
})

const sessionOptions = {
    store,
    secret: "akashgarg@123355345",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 6 * 1000,
        httpOnly: true,
    },
};


  

  
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());
app.use(session(sessionOptions));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());
app.use((req , res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser= req.user;
    
    next();
  })


app.use("/", userRouter,homeRouter);

app.get("/path",isLoggedIn,(req,res)=>{
    res.render("nav/path.ejs");
})

// Route to save path data
app.post('/save-path', (req, res) => {
  const { path } = req.body;
  if (!path || !Array.isArray(path)) {
    return res.status(400).json({ message: 'Invalid path data' });
  }

  // Save the path to a file (or database)
  fs.writeFile('path-log.txt', path.join(' -> '), (err) => {
    if (err) {
      console.error('Error saving path:', err);
      return res.status(500).json({ message: 'Failed to save path' });
    }
    res.status(200).json({ message: 'Path saved successfully' });
  });
});







app.all("*", (req, res, next) => {
    next(new ExpressErr(404, "page not fount!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;

    res.status(statusCode).send(message);
});

app.listen(PORT, () => {
    console.log(`server is connected at port ${PORT}`);
});
