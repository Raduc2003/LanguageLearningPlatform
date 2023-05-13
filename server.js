const express = require("express");
const app = express();
app.use(express.static("Public"));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.listen(3000);
