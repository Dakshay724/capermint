const User = require("../models/users");

const router = require("express").Router();
router.get("/chat", (req, res) => {
  const messages = [];
  const { name, id } = req.query;
  res.render("chat", { messages, name, id });
});
router.get("/verify-user", (req, res) => {
  res.render("verification");
});

router.post("/verify", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(user);
    if (user) {
      return res.redirect(
        `/chat?name=${encodeURIComponent(user.name)}&id=${encodeURIComponent(
          user._id
        )}`
      );
    } else {
      return res.render("verification", { error: "Invalid email address" });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
