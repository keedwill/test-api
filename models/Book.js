const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true
  },
  description: {
    type: String,
    required: true,
  },
 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Book", BookSchema);
