import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    user: { 
      type: String, 
      required: true 
    }, // The user who made the comment
    
    text: { 
      type: String, 
      required: true 
    }, // The content of the comment
    
    post: { 
      type: Schema.Types.ObjectId, 
      ref: 'Post', 
      required: true 
    } // Reference to the post it belongs to
  }, 
  { 
    timestamps: true 
  }
);

const Comment = model('Comment', commentSchema);

export default Comment;
