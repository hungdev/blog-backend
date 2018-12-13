// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const Post = require("../models/post");

// res.setHeader('Content-Type', 'application/json');
//https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions
exports.get_all_post = async (req, res, next) => {
  let criteria = {}
  if (mongoose.Types.ObjectId.isValid(req.query.user_id)) {
    criteria.userID = mongoose.Types.ObjectId(req.query.user_id)
  }
  // skip: lấy từ phần tử số skip đó trở đi
  try {
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 100;
    const skip = parseInt(req.query.skip) > 0 ? parseInt(req.query.skip) : 0;
    const postResult = await Post.find(criteria).skip(skip).limit(limit).sort({ title: 1 })
      .select("title content category tag location created_date userID imageUrl")
    res.status(200).json({
      result: "ok",
      data: postResult,
      count: postResult.length,
      message: "Query list of posts successfully"
    })
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }

  // Post.find(criteria).limit(100).sort({ title: 1 })
  //   .select("title content category tag location created_date userID imageUrl").exec((err, posts) => {
  //     if (err) {
  //       res.json({
  //         result: "failed",
  //         data: [],
  //         message: `Error is : ${err}`
  //       });
  //     } else {
  //       res.json({
  //         result: "ok",
  //         data: posts,
  //         count: posts.length,
  //         message: "Query list of posts successfully"
  //       });
  //     }
  //   });
};


exports.update_post = (req, res, next) => {
  let conditions = {};//search record with "conditions" to update
  if (mongoose.Types.ObjectId.isValid(req.body.post_id) == true) {
    conditions._id = mongoose.Types.ObjectId(req.body.post_id);
  } else {
    res.json({
      result: "failed",
      data: {},
      message: "You must enter post_id to update"
    });
  }

  if (mongoose.Types.ObjectId.isValid(req.body.user_id)) {
    newValues.userId = mongoose.Types.ObjectId(req.body.user_id);
  }

  const newValues = {};
  Object.keys(req.body).forEach(e => {
    newValues[e] = req.body[e]
  })

  const options = {
    new: true, // return the modified document rather than the original.
    multi: true
  }

  Post.findOneAndUpdate(conditions, { $set: newValues }, options, (err, updatedPost) => {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Cannot update existing post. Error is : ${err}`
      });
    } else {
      res.json({
        result: "ok",
        data: updatedPost,
        message: "Update post successfully"
      });
    }
  });
};

exports.get_detail_post = (request, response, next) => {
  Post.findById(require('mongoose').Types.ObjectId(request.query.post_id),
    (err, post) => {
      if (err) {
        response.json({
          result: "failed",
          data: {},
          message: `Error is : ${err}`
        });
      } else {
        response.json({
          result: "ok",
          data: post,
          message: "Query post by Id successfully"
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

exports.post_delete = (req, res, next) => {
  Post.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.postId) }, (err) => {
    if (err) {
      res.json({
        result: "failed",
        message: `Cannot delete Post with Id: ${req.params.postId}. Error is : ${err}`
      });
      return;
    }
    res.json({
      result: "ok",
      message: `Delete category and Post with post Id ${req.params.postId} successful`
    });
  });
};
