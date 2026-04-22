const router = require('express').Router();
const multer = require('multer');
const ctrl = require('../controllers/upload.controller');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), ctrl.uploadFile);

module.exports = router;