const Category = require("../models/categories");
require("dotenv").config();

const categoriesCheck = async (req, res, next) => {
  const { categoryId } = req.query;
  try {
    if (!categoryId) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "please enter a category id",
        data: [],
      });
    }

    const category = await Category.findById(categoryId);
    if (category) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "this is not valid category id",
        data: [],
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: "Something went wrong",
      data: [],
      error: error.message,
    });
  }
};

module.exports = categoriesCheck;
