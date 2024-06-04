const multer = require("multer");
const path = require("path");

const storageBook = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../images/book");
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../images/user");
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    const fileName =
      path.parse(file.originalname).name +
      "" +
      Date.now() +
      path.extname(file.originalname);

      cb(null,fileName);
  }
});

const uploadProfile = multer({
  storage: storageUser,
}).single("profilepicture")

const uploadBook = multer({
  storage: storageBook,
}).single("image");

module.exports = {
  uploadBook,
  uploadProfile
};
