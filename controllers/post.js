const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const Post = require("../models/post");

exports.get_all_post = (req, res, next) => {
  Post.find({}).limit(100).sort({ title: 1 })
    .select("title content category tag location created_date userID imageUrl").exec((err, posts) => {
      if (err) {
        res.json({
          result: "failed",
          data: [],
          message: `Error is : ${err}`
        });
      } else {
        res.json({
          result: "ok",
          data: posts,
          count: posts.length,
          message: "Query list of posts successfully"
        });
      }
    });
};

exports.create_post = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    tag: req.body.tag,
    location: req.body.location,
    userID: mongoose.Types.ObjectId(req.userData.userId),
    imageUrl: req.file.path
  });
  post.save((err) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        data: {
          message: "Insert new post successfully"
        }
      });
    }
  });
};

//http://localhost:3000/open-image?image_name=uploads/2018-12-12T04:43:50.787Z47390714_767819240231467_8016730945325367296_n.jpg
exports.open_image = (request, response, next) => {
  // let imageName = "uploads/" + request.query.image_name;
  let imageName = request.query.image_name;
  fs.readFile(imageName, (err, imageData) => {
    if (err) {
      response.json({
        result: "failed",
        message: `Cannot read image.Error is : ${err}`
      });
      return;
    }
    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    response.end(imageData); // Send the file data to the browser.
  });
};