const express = require("express");
const router = express.Router();
router.get("/", function (req, res) {
  res.render("courses");
});

router.get("/:course", (req, res) => {
  res.render(`courses/${req.params.course}`);
});
router.get("/:course/:id", (req, res) => {
  res.render(`courses/${req.params.course}/${req.params.id}`);
});
// router.get("/english/lesson1", (req, res) => {
//   res.render("courses/english/lesson1");
// });
module.exports = router;
