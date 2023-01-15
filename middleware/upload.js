// import multer, puth
const multer = require("multer");
const path = require("path");

const temDir = path.join(__dirname, "../", "temp");

// створюємо функцію multerConfig
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});
// створюємо мідлвар upload

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
