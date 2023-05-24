const express = require("express");
const cookieParser= require("cookie-parser");
const router = express.Router();
const fs = require("fs");
let users = [];
router.use(cookieParser());
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

  const user = {
    id: Date.now().toString(),
    email,
    username,
    password,
    progress: 0, 
  };

  // users.push(newUser);
  // fs.writeFile("users.json", JSON.stringify(users), err => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send("Server Error");
  //   } else {
  //     res.send("User created successfully");
  //   }
  // });

  fs.readFile("users.json", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // If the file doesn't exist, create a new file with the initial user
        const users = [user];
        fs.writeFile("users.json", JSON.stringify(users), err => {
          if (err) {
            console.error(err);
            res.status(500).send("Server Error");
          } else {
            res.send("User created successfully");
          }
        });
      } else {
        // Other error occurred while reading the file
        console.error(err);
        res.status(500).send("Server Error");
      }
    } else {
      // File exists, append the new user to the existing users
      let existingUsers = JSON.parse(data);
      existingUsers.push(user);
  
      fs.writeFile("users.json", JSON.stringify(existingUsers), err => {
        if (err) {
          console.error(err);
          res.status(500).send("Server Error");
        } else {
          res.send("User created successfully");
        }
      });
    }
  });
  res.redirect("/courses");
});

module.exports = router;
