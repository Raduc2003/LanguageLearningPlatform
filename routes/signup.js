const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup");
});
router.post("/", (req, res) => {
  console.log(req.body.username);
  res.send("asda");
});
module.exports = router;
