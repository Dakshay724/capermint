const Category = require("../models/categories");

const createCategory = async (req, res) => {
  try {
    const { _id } = req["data"];
    const { name, parentId } = req.body;
    if (parentId) {
      var parent = await Category.findById(parentId);
      const category = await Category.create({
        name,
        parentId: parent._id ? parent._id : null,
        createdBy: _id,
      });
      if (category) {
        return res.status(201).json({
          status: 201,
          success: true,
          message: "category created successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to create category",
        });
      }
    }
    const category = await Category.create({
      name,
      parentId: null,
      createdBy: _id,
    });
    if (category) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "category created successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "unable to create category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const { name, parentId } = req.body;

    const category = await Category.findById(categoryId);
    if (category) {
      await Category.findByIdAndUpdate(
        categoryId,
        {
          name: name ? name : category.name,
          parentId: parentId ? parentId : category.parentId,
        },
        { new: true }
      );
      return res.status(201).json({
        status: 201,
        success: true,
        message: "category updated successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "unable to find category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: " category deleted successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "unable to delete category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (category) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "category by category id",
          data: category,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find category by category id",
        });
      }
    } else {
      const category = await Category.find();
      if (category) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "all categories",
          data: category,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find categories",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

const getCategoriesByParentId = async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (categoryId) {
      const category = await Category.find({ parentId: categoryId });
      if (category) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "categories by parent id",
          data: category,
        });
      } else {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find categories by category parent id",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "please enter a category id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoriesByParentId,
};
