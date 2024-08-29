import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    user: { 
      type: String, 
      required: true 
    }, // User who created the post
    
    content: { 
      type: String, 
      required: true 
    }, // Main content of the post
    
    tags: [
      { 
        type: String 
      }
    ], // Tags associated with the post
    
    likes: { 
      type: Number, 
      default: 0 
    }, // Number of likes on the post
    
    likedBy: [
      { 
        type: String 
      }
    ], // List of users who liked the post
    
    comments: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
      }
    ] // References to the comments
  },
  { 
    timestamps: true 
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
