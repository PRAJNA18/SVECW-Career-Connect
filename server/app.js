const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const userRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

// Route to fetch all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const Blog = require('./models/Post'); 
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to search for blogs by title
app.get('/api/blogs/search', async (req, res) => {
  try {
    const Blog = require('./models/Post'); // Import your Blog model
    const { query } = req.query;
    const blogs = await Blog.find({
      title: { $regex: new RegExp(query, 'i') }, // Case-insensitive search
    });
    res.json(blogs);
  } catch (error) {
    console.error('Error searching for blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch a specific blog post by ID
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


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
