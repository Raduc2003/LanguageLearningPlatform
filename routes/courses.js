const express = require("express");
const router = express.Router();
const { authenticate } = require("../Public/js/auth.js");
const { updateUserProgress } = require("../Public/js/update.js");
router.use(express.json());
router.get("/", authenticate, function (req, res) {
  res.render("courses");
});

router.get("/:course", authenticate, (req, res) => {
  const loggedInUser = req.cookies.user;
  res.render(`courses/${req.params.course}`, { user: loggedInUser });
});
router.get("/:course/progress", authenticate, (req, res) => {
  const loggedInUser = req.cookies.user;
  res.setHeader("Cache-Control", "no-cache");
  res.json({ progress: loggedInUser.progress });
});

router.post("/:course/progress", authenticate, (req, res) => {
  const loggedInUser = req.cookies.user;
  loggedInUser.progress = req.body.progress;
  updateUserProgress(loggedInUser.id, loggedInUser.progress);

  res.json({ progress: loggedInUser.progress });
});

router.get("/:course/:id", authenticate, (req, res) => {
  res.render(`courses/` + req.params.course + "/" + req.params.id);
});

module.exports = router;
