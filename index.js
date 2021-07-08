const express = require("express");
const app = express();


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

app.get("/login", (req, res) => {
    res.render("login");
});

app.use((req, res) => {
    res.status(404).render("404");
});


// Run it!
app.listen(8080);
console.log("App running on localhost:8080");