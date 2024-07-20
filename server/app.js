const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const updateRoutes = require('./routes/update');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/profile', profileRoutes);

app.get('/api/blogs', async (req, res) => {
  try {
    const Blog = require('./models/Post'); 
    const { page = 1, limit = 6 } = req.query;

    const blogs = await Blog.find().sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
      
    const totalBlogs = await Blog.countDocuments();

    res.json({
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: Number(page)});
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/blogs/search', async (req, res) => {
  try {
    const Blog = require('./models/Post'); 
    const { query } = req.query;
    const blogs = await Blog.find({
      title: { $regex: new RegExp(query, 'i') }, 
    });
    res.json(blogs);
  } catch (error) {
    console.error('Error searching for blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/blogs/user/:email', async (req, res) => {
  try {
    const Blog = require('./models/Post');
    const { email } = req.params;
    const posts = await Blog.find({ studentEmail: email }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts by user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const Blog = require('./models/Post');
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const Blog = require('./models/Post');
    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {

      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
