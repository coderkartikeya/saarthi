import express from 'express';
import Post from '../models/postSchema.js'; 
import Comment from '../models/commentSchema.js'; 

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments').exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post({
    user: req.body.user,
    content: req.body.content,
    tags: req.body.tags,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Like a post
router.patch('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likedBy.includes(req.body.user)) {
      return res.status(400).json({ message: 'User has already liked this post' });
    }
    post.likes += 1;
    post.likedBy.push(req.body.user);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments').exec();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
