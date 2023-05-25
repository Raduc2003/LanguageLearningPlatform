const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const fs = require("fs");
let users = [];
router.use(cookieParser());
router.get("/", (req, res) => {
  res.render("signup");
});
router.post("/", (req, res) => {
  const { email, username, password } = req.body;

  const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  if (!usernamePattern.test(username) || !passwordPattern.test(password)||!emailPattern.test(email)) {
    res.render("signup", {
      error:
        "Formatul email sau username-ului sau parolei este incorect: username alfanumeric intre 4-20 caractere \n iar parola trebuie sa contina litera mica ,mare, cifra si sa aiba minim 8 caracatere",
    });
    res.redirect("/signup");
    return;
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res.render("signup", {
      error: "Username already exists",
    });
    console.log("ai supto");
    res.redirect("/signin");
    return;
  }

  const user = {
    id: Date.now().toString(),
    email,
    username,
    password,
    progress: 1,
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
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
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

      fs.writeFile("users.json", JSON.stringify(existingUsers), (err) => {
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
