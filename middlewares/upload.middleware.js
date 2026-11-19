const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../public/img'); // adjust path as needed
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const fileFilter = (req, file, cb) => {
  const filePath = path.join(uploadDir, file.originalname);
  if (fs.existsSync(filePath)) {
    return cb(new Error('A file with this name already exists.'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Wrapper to cleanly catch Multer errors
const uploadSingleImage = (req, res, next) => {
  upload.single('imagen_archivo')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = {
    uploadSingleImage
};