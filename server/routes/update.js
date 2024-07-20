const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedData);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

