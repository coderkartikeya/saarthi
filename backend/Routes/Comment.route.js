import { Router } from 'express';
import Comment from '../models/commentSchema.js';
import Post from '../models/postSchema.js';

const router = Router();

// Get all comments for a specific post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new comment to a post
router.post('/post/:postId', async (req, res) => {
  const comment = new Comment({
    user: req.body.user,
    text: req.body.text,
    post: req.params.postId,
  });

  try {
    const newComment = await comment.save();
    const post = await Post.findById(req.params.postId);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
