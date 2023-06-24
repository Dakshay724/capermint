const path = require("path");
const multer = require("multer");

const fs = require("fs");
const Product = require("../models/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    const timestamp = Date.now().toString();
    cb(null, `${filename}-${timestamp}${ext}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (
      allowedTypes.includes(file.mimetype) &&
      allowedExtensions.includes(path.extname(file.originalname))
    ) {
      cb(null, true);
    } else {
      cb(new multer.MulterError("Only JPEG, PNG, and GIF images are allowed."));
    }
  },
});

const deleteImages = async (req, res, next) => {
  const { productId } = req.query;
  try {
    if (!productId) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "please enter a productId",
        data: [],
      });
    }
    if (productId && req.files) {
      Product.findById(productId)
        .then((product) => {
          if (product) {
            const imagesDirectory = path.join(__dirname, "../upload");
            fs.readdir(imagesDirectory, (err, files) => {
              if (err) {
                return res.status(500).json({
                  status: 500,
                  success: false,
                  message: " something went wrong",
                  error: err,
                });
              }
              product.images.forEach((file) => {
                const filePath = path.join(imagesDirectory, file);
                fs.unlink(filePath, (err) => {
                  if (err) {
                    return res.status(500).json({
                      status: 500,
                      success: false,
                      message: " something went wrong",
                      error: err,
                    });
                  } else {
                    next();
                  }
                });
              });
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "there is no product with this id",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to delete file",
            error: error,
          });
        });
    } else {
      Product.findById(productId)
        .then((product) => {
          if (product) {
            const imagesDirectory = path.join(__dirname, "../upload");
            fs.readdir(imagesDirectory, (err, files) => {
              if (err) {
                return res.status(500).json({
                  status: 500,
                  success: false,
                  message: " something went wrong",
                  error: err,
                });
              }
              product.images.forEach((file) => {
                const filePath = path.join(imagesDirectory, file);
                fs.unlink(filePath, (err) => {
                  if (err) {
                    return res.status(500).json({
                      status: 500,
                      success: false,
                      message: " something went wrong",
                      error: err,
                    });
                  } else {
                    next();
                  }
                });
              });
            });
          } else {
            return res.status(400).json({
              status: 400,
              success: false,
              message: "there is no product with this id",
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "unable to delete file",
            error: error,
          });
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

module.exports = { upload, deleteImages };
