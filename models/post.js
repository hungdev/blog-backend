'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: ""
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  // emotion: {
  //   type: String,
  //   default: ""
  // },
  userID: Schema.ObjectId,
  imageUrl: {
    type: String
  },
});
// a setter
// PostSchema.path('name').set((inputString) => {
//   return inputString[0].toUpperCase() + inputString.slice(1);
// });

module.exports = mongoose.model('Post', PostSchema);