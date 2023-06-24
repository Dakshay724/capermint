const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProduct,
} = require("../controllers/products");
const auth = require("../middleware/auth");
const categoriesCheck = require("../middleware/categories");
const { upload, deleteImages } = require("../middleware/multer");

router.post(
  "/createProduct",
  [auth, categoriesCheck, upload.array("images", 5)],
  createProduct
);
router.put(
  "/updateProduct",
  [auth, categoriesCheck, upload.array("images", 5), deleteImages],
  updateProduct
);
router.delete("/deleteProduct", [auth, deleteImages], deleteProduct);
router.get("/getProduct", auth, getProduct);
router.get("/searchProduct", auth, searchProduct);

module.exports = router;
