const router = require("express").Router();
const {
  createUser,
  loginUser,
  logout,
  viewProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/Users");
const auth = require("../middleware/auth");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/logout", auth, logout);
router.get("/viewProfile", auth, viewProfile);
router.get("/getAllUsers", getAllUsers);
router.put("/updateProfile", auth, updateProfile);

module.exports = router;
