const express = require("express");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static("Public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const authenticate = (req, res, next) => {
  const authCookie = req.cookies.auth;
  console.log(authCookie);
  if (authCookie === "true") {
    // Utilizatorul este autentificat, permite accesul la ruta protejată
    next();
  } else {
    // Utilizatorul nu este autentificat, redirecționează către pagina de autentificare
    res.redirect("/signin");
  }
};


app.get("/",authenticate, (req, res) => {
  res.render("index");
});
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const coursesRouter = require("./routes/courses");
const profileRouter = require("./routes/profil");

app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/courses", coursesRouter);
app.use("/profil",profileRouter);

app.listen(3000);
