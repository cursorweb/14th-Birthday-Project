const express = require("express");
const app = express();

const Client = require("@replit/database");
const db = new Client();

const { serialize, deserialize, readCookie } = require("./util");


// Setup
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));


// Log in with repl.it
app.use((req, res, next) => {
    res.locals.username = req.header("x-replit-user-name") || `${readCookie(req.headers.cookie, "username")} (guest)`;
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

// reminder: users[username] will always be greater than 0.
app.get("/dash", async (_, res) => {
    const username = res.locals.username;
    if (!username) res.redirect("/login");
    else {
        const users = await db.get("users");
        res.render("dashboard", { message: !!users[username] });
    }
});

app.get("/create", async (_, res) => {
    const username = res.locals.username;
    if (!username) res.redirect("/login");
    else {
        const users = await db.get("users");

        if (users[username]) res.redirect("/cookie");
        else res.render("make-card");
    }
});

app.post("/create", async (req, res) => {
    const username = res.locals.username;
    if (!username) res.redirect("/login");
    else {
        const text = serialize(req.body.card.replace(/\r?\n/g, " "));

        let latestUser = await db.get("latestUser");
        let cards = await db.get("cards");
        let users = await db.get("users");

        latestUser++;
        cards.push({ name: username, content: text });
        users[username] = latestUser;

        await db.set("cards", cards);
        await db.set("latestUser", latestUser);
        await db.set("users", users);

        res.redirect("/cookie");
    }
});

app.get("/cards", (_, res) => {
    if (!res.locals.username) res.redirect("/login");
    else res.render("cards");
});

app.get("/cookie", async (_, res) => {
    const username = res.locals.username;

    if (!username) res.redirect("/login");
    else {
        const users = await db.get("users");

        if (!users[username]) res.redirect("create");
        else res.render("cookie-slice", { slice: users[username] });
    }
});

app.use((_, res) => {
    res.status(404).render("404");
});


// Run it!
app.listen(8080);
console.log("App running on localhost:8080");