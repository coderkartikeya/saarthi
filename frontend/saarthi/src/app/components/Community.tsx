'use client'
import React, { useEffect, useState } from 'react';
import { FaUserTag, FaCommentDots, FaHeart, FaLink } from 'react-icons/fa';
import Link from 'next/link';

interface Comment {
  user: string;
  text: string;
}

interface Post {
  _id: number;
  user: string;
  content: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  showComments: boolean;
  newComment: string;
}

const CommunityPage = (props:any) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      _id: 1,
      user: 'John Doe',
      content: 'Looking for a hospital bed in New York. Any recommendations?',
      tags: ['@hospitalNYC', '@doctorSmith'],
      likes: 12,
      likedBy: [],
      comments: [
        { user: 'Alice', text: 'Try Bellevue Hospital. They usually have availability.' },
        { user: 'Bob', text: 'Have you checked with Mount Sinai?' },
      ],
      showComments: false,
      newComment: '',
    },
    {
      _id: 2,
      user: 'Jane Smith',
      content: 'Does anyone have information on the new vaccination drive in California?',
      tags: ['@healthDeptCA', '@doctorBrown'],
      likes: 8,
      likedBy: [],
      comments: [
        { user: 'Charlie', text: 'You can find information on the state’s official website.' },
      ],
      showComments: false,
      newComment: '',
    },
  ]);
  useEffect(()=>{
    const func=async()=>{
        const response=await fetch('http://localhost:4000/posts');
        const data=await response.json();
        console.log(data)
        setPosts(data);
    }
    func();

  },[])

  const [currentUser] = useState<string>('User123'); // Simulate the current user

  const toggleComments = (postId: number) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const handleLike =async (postId: number) => {
    const request=await fetch(`http://localhost:4000/posts/${postId}/like`,{
      method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: localStorage.getItem('name') })
    })
    setPosts(posts.map(post => {
      if (post._id === postId) {
        if (post.likedBy.includes(currentUser)) {
          // User has already liked this post
          return post;
        }
        return {
          ...post,
          likes: post.likes + 1,
          likedBy: [...post.likedBy, currentUser], 
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, comments: [...post.comments, { user: 'New User', text: comment }], newComment: '' } : post
    ));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, newComment: value } : post
    ));
  };

  return (
    <div className="max-w-6xl   mx-auto p-6 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl shadow-lg mt-10 overflow-y-scroll no-scrollbar">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Community Posts</h1>

      
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md text-center">
        <Link href={props.link}>
          <div className="flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg">
            <FaLink className="mr-2" /> Create a New Post
          </div>
        </Link>
      </div>

      
      {posts.map((post) => (
        <div key={post._id} className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaUserTag className="text-teal-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">{post.user}</h2>
          </div>
          <p className="text-gray-700 mb-2">{post.content}</p>
          <div className="text-sm text-gray-500 mb-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="mr-2 text-teal-600">{tag}</span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              
              <button className="ml-2 text-teal-500 hover:text-teal-600" onClick={() => handleLike(post._id)}><FaHeart className="text-red-500 mr-1" /> {post.likes} Likes</button>
            </div>
            <div className="flex items-center cursor-pointer" onClick={() => toggleComments(post._id)}>
              <FaCommentDots className="text-teal-500 mr-1" /> {post.comments.length} Comments
            </div>
          </div>

          
          {post.showComments && (
            <div className="mt-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded-lg shadow-inner">
                  <span className="font-semibold text-gray-800">{comment.user}: </span>
                  <span className="text-gray-600">{comment.text}</span>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-2 bg-gray-50 rounded-lg shadow-inner"
                  value={post.newComment}
                  onChange={(e) => handleCommentChange(post._id, e.target.value)}
                />
                <button
                  className="ml-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleComment(post._id, post.newComment)}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
