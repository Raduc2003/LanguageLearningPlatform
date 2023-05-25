const express = require("express");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static("Public"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
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

app.use((req, res) => {
  res.status(404).render('404');
});



app.listen(3000);
