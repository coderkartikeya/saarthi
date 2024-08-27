'use client'
import React, { useState } from 'react';
import { FaPen, FaRobot } from 'react-icons/fa';

const PostPage = () => {
  const [postContent, setPostContent] = useState('');
  const [suggestedContent, setSuggestedContent] = useState('');

  // Function to get suggestions from Gemini API
  const generatePostWithGemini = async () => {
    try {
      const response = await fetch('https://api.gemini.com/v1/text-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AIzaSyC1TW1J9yJnIeNDiruRuUMMBfcWN1Ic5ns`, // Replace with your actual API key
        },
        body: JSON.stringify({
          prompt: 'I need help writing a post for the community about finding a hospital bed or other medical assistance.', // Customize as needed
        }),
      });

      const data = await response.json();
      setSuggestedContent(data.generated_text); // Adjust based on the actual API response structure
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestedContent('Sorry, we couldn\'t get a suggestion at this time.');
    }
  };

  const handlePostChange = (event: any) => {
    setPostContent(event.target.value);
  };

  const handleUseSuggestion = () => {
    setPostContent(suggestedContent);
  };

  const handlePostSubmit = () => {
    console.log('Post submitted:', postContent);
    setPostContent('');
    setSuggestedContent('');
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-white to-blue-100 rounded-xl shadow-2xl md:mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Create a New Post
      </h1>

      <div className="mb-6">
        <textarea
          className="w-full p-4 rounded-lg bg-white shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 resize-none"
          rows={8}
          placeholder="Write your post here..."
          value={postContent}
          onChange={handlePostChange}
        ></textarea>
      </div>

      {suggestedContent && (
        <div className="mb-6 p-6 bg-blue-100 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Gemini's Suggestion:</h2>
          <p className="text-gray-700">{suggestedContent}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={handleUseSuggestion}
          >
            Use This Suggestion
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={handlePostSubmit}
        >
          <FaPen className="mr-2" /> Post
        </button>
        <button
          className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={generatePostWithGemini}
        >
          <FaRobot className="mr-2" /> Get Help from Gemini
        </button>
      </div>
    </div>
  );
};

export default PostPage;
