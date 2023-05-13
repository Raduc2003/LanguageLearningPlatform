const express = require("express");
const router = express.Router();
router.get("/", function (req, res) {
  res.render("courses");
});

router.get("/:course", (req, res) => {
    res.render(`courses/${req.params.course}`);
});

module.exports = router;
