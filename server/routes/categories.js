const router = require("express").Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoriesByParentId,
} = require("../controllers/categories");
const auth = require("../middleware/auth");

router.post("/createCategory", auth, createCategory);
router.put("/updateCategory", auth, updateCategory);
router.delete("/deleteCategory", auth, deleteCategory);
router.get("/getCategory", auth, getCategory);
router.get("/categoriesByParentId", auth, getCategoriesByParentId);

module.exports = router;
