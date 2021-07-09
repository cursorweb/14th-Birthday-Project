const express = require("express");
const app = express();

const Client = require("@replit/database");
const db = new Client();

const { serialize, deserialize }  = require("./util");


// Setup
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));


// Log in with repl.it
app.use((req, res, next) => {
    res.locals.username = req.header("x-replit-user-name");
    next();
});


// Statics
app.use(express.static(__dirname + "/public"));

// Views
app.get("/", (_, res) => {
    res.render("index");
});

app.get("/login", (_, res) => {
    if (res.locals.username) res.redirect("/dash");
    else res.render("login");
});

app.get("/dash", (_, res) => {
    // if (!res.locals.username) res.redirect("/login");
    // else
    res.render("dashboard", { message: false });
});

app.get("/create", (_, res) => {
    // if (!res.locals.username) res.redirect("/login");
    // else
    // todo: redirect if made cookie to view cookie
    res.render("make-card");
});

app.post("/create", (req, res) => {
    // if (!res.locals.username) res.redirect("/login");
    // else
    res.redirect("/cookie-slice");
});

app.get("/cards", (_, res) => {
    // if (!res.locals.username) res.redirect("/login");
    // else
    res.render("cards");
});

app.get("/cookie", (_, res) => {
    // if (!res.locals.username) res.redirect("/login");
    // else
    // todo: redirect if not made cookie to make cookie
    res.render("cookie-slice", { sliceNumber: 3 });
});

app.use((_, res) => {
    res.status(404).render("404");
});


// Run it!
app.listen(8080);
console.log("App running on localhost:8080");