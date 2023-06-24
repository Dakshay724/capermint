const Product = require("../models/products");

const createProduct = async (req, res) => {
  try {
    const { _id } = req["data"];
    const { categoryId } = req.query;
    const { title, description, amount } = req.body;
    const fileNames = [];
    if (req.files) {
      req.files.forEach((file) => {
        fileNames.push(file.filename);
      });
    }

    const product = await Product.create({
      images: fileNames,
      title: title,
      categoryId: categoryId,
      createdBy: _id,
      description: description,
      amount: amount,
    });

    if (product) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "product created successfully",
      });
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "unable to create product",
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

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const { title, description, amount } = req.body;

    const fileNames = [];
    if (req.files) {
      req.files.forEach((file) => {
        fileNames.push(file.filename);
      });
    }

    const product = await Product.findById(productId);

    if (product) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          images: fileNames.length > 0 ? fileNames : product.images,
          title: title ? title : product.title,
          description: description ? description : product.description,
          amount: amount ? amount : product.amount,
        },
        { new: true }
      );

      if (updatedProduct) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Product updated successfully",
        });
      }
    }

    return res.status(400).json({
      status: 400,
      success: false,
      message: "Unable to update product",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    Product.findByIdAndDelete(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            status: 404,
            success: false,
            message: "product not found",
          });
        } else {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "Product successfully deleted",
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to delete product",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: " something went wrong",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId, categoryId } = req.query;
    const url = `${req.protocol}://${req.headers.host}/upload/`;

    if (categoryId) {
      Product.find({ categoryId: categoryId })
        .then((products) => {
          if (!products || products.length === 0) {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Unable to find products with this category",
            });
          }

          // Add URL prefix to product.images
          const productsWithImagesURL = products.map((product) => ({
            ...product._doc,
            images: product.images.map((image) => url + image),
          }));

          return res.status(200).json({
            status: 200,
            success: true,
            message: "All products by category ID",
            data: productsWithImagesURL,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Unable to find products with this category",
            error: error,
          });
        });
    } else if (productId) {
      Product.findById(productId)
        .then((product) => {
          if (!product) {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Unable to find product",
            });
          }

          // Add URL prefix to product.images
          const productWithImagesURL = {
            ...product._doc,
            images: product.images.map((image) => url + image),
          };

          return res.status(200).json({
            status: 200,
            success: true,
            message: "Product with its ID",
            data: productWithImagesURL,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Unable to find product",
            error: error,
          });
        });
    } else {
      Product.find()
        .then((products) => {
          if (!products || products.length === 0) {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Unable to find products",
            });
          }

          // Add URL prefix to product.images for all products
          const productsWithImagesURL = products.map((product) => ({
            ...product._doc,
            images: product.images.map((image) => url + image),
          }));

          return res.status(200).json({
            status: 200,
            success: true,
            message: "All products",
            data: productsWithImagesURL,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Unable to find products",
            error: error,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { title } = req.query;
    Product.find({ title: { $regex: new RegExp(`.*${title}.*`, "i") } })
      .then((products) => {
        if (products.length > 0) {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "search results found",
            data: products,
          });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to find product with this title",
          });
        }
      })
      .catch((error) => {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "unable to find product",
          error: error,
        });
      });
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
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProduct,
};
