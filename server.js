const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static("Public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const coursesRouter = require("./routes/courses");
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/courses", coursesRouter);
app.listen(3000);
