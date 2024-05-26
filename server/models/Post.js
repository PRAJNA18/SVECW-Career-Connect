const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true 
  },
  companyName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  jobType: {
    type: String,
    enum: ['internship', 'fulltime'],
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Set 'title' field before saving the document
postSchema.pre('save', function(next) {
  const { companyName, year, jobType } = this;
  this.title = `${companyName} ${year} ${jobType}`;
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
