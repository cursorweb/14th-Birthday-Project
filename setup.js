#!/bin/env/node
const Client = require("@replit/database");
const db = new Client();

(async () => {
    await db.set("latestUser", 0);
    await db.set("cards", []);
    await db.set("users", {});
})();