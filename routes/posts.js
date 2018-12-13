// var express = require('express');
// var router = express.Router();
import multer from 'multer';
import checkAuth from '../middleware/checkAuth'
const PostController = require('../controllers/post');
var router = global.router;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



/* GET users listing. */
router.get("/get-all-post", PostController.get_all_post);

router.put("/update-post", PostController.update_post);

router.get("/get-detail-post", PostController.get_detail_post);

router.post("/create-post", checkAuth, upload.single('imageUrl'), PostController.create_post);

router.get("/open-image", PostController.open_image);

router.delete("/post/:postId", PostController.post_delete);


module.exports = router;
