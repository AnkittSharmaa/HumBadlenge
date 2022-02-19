import express from "express";
import mongoose from "mongoose";
import LocalStrategy from "passport-local";
import path from "path"
import session from "express-session";
import passport from "passport";
import User from "./models/User.js"
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.DB_ACCESS_LINK);
mongoose.connection.on("error", (e) => {
    console.log(e.message);
});
mongoose.connection.once("open", () => {
    console.log("Connected to Database");
});


const __dirname = path.resolve();
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // path
app.use(express.static(path.join(__dirname, "public")));

const secret = process.env.SESSION_SECRET || "H7wVAqN5ZXE4uGNTWDTlKtQF1DEQVbLC";
const sessionConfig = {
    name: "session",
    secret,
    saveUninitialized: true,
    resave: false,
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const user = new User(req.body)
    const registeredUser = await User.register(user, req.body.password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/')
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate("local", { failureRedirect: "/register" }), (req, res) => {
    res.json(req.user)
})

app.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/register')
    }
    res.send('registered')
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

app.get('/q', (req, res) => {
    res.render('questions');
})

app.get('/q/h', (req, res) => {
    res.render('happy')
})

app.get('/q/s', (req, res) => {
    res.render('sad')
})

app.get('/q/s/d', (req, res) => {
    res.render('depression');
})

app.get('/q/s/h', (req, res) => {
    res.render('depression');
})

app.get('/q/s/h/et', (req, res) => {
    res.render('depression')
})
app.get('/q/s/h/bt', (req, res) => {
    res.render('depression')
})
app.get('/q/s/h/bs', (req, res) => {
    res.render('depression')
})

app.all("*", () => {
    throw new Error("Page not found")
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no something went wrong!!";
    res.status(statusCode).render("error", { err })
})


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server up and runnning on port ${PORT}`)
});