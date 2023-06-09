const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const fs = require("fs");

let users = [];

fs.readFile("users.json", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  users = JSON.parse(data);
});
router.get("/", (req, res) => {
  res.render("signin");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;


  const authenticatedUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (authenticatedUser) {
    res.cookie("user", authenticatedUser);
    res.cookie("auth", "true");
    res.redirect("/courses");
  } else {
    res.render("signin", { error: "Credențiale incorecte" });
  }
});

module.exports = router;
