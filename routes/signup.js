const express = require("express");
const cookieParser= require("cookie-parser");
const router = express.Router();
let users = [];
app.use(cookieParser());
router.get("/", (req, res) => {
  res.render("signup");
});
router.post("/", (req, res) => {
  const { email, username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res.render("signup", {
      error: "Username already exists",
    });
    console.log("ai supto");
    res.redirect("signup");
    return;
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    username,
    password,
    progress: 0, 
  };

  // Adăugați utilizatorul în array-ul users
  users.push(newUser);


  res.redirect("/");
});

module.exports = router;
