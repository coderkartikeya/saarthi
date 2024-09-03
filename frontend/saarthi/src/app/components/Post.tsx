'use client'
import React, { useState } from 'react';
import { FaPen, FaRobot } from 'react-icons/fa';

const PostPage = () => {
  const [postContent, setPostContent] = useState('');
  const [suggestedContent, setSuggestedContent] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to get suggestions from Gemini API
  const generatePostWithGemini = async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: 'I need help regarding  comment i can make on community as i want bed or other medical assistance in 30-40 words', // Customize as needed
        }),
      });

      const data = await response.json();
      const output = data.output;

      // Corrected extraction of prompts, ensure it captures the full text
      const extractedPrompts = output
        .split(/\*\*Prompt \d+:\*\*/g) // Split on **Prompt x:** markers
        .filter(Boolean)               // Remove empty strings
        .map((prompt: string) => prompt.trim()); // Trim whitespace

      setSuggestedContent(extractedPrompts);
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestedContent(['Sorry, we couldn\'t get a suggestion at this time.']);
    } finally {
      setIsLoading(false); // Set loading to false when fetching ends
    }
  };

  const handlePostChange = (event: any) => {
    setPostContent(event.target.value);
  };

  const handleUseSuggestion = (suggestion: string) => {
    setPostContent(suggestion);
  };

  const handlePostSubmit = async() => {
    try{
      const response=await fetch('http://localhost:4000/posts',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify({
            user:localStorage.getItem('name'),
            content:postContent
            })
      })
      const data=await response.json()
      console.log(data)
    console.log('Post submitted:', postContent);
    setPostContent('');
    setSuggestedContent([]);
    } catch (error) {
      console.error('Error submitting post:', error);
      }
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

      {isLoading ? (
        <div className="mb-6 p-6 bg-blue-100 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Loading...</h2>
          <p className="text-gray-700">Please wait while we fetch suggestions for you.</p>
        </div>
      ) : (
        suggestedContent.length > 0 && (
          <div className="mb-6 p-6 bg-blue-100 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Gemini's Suggestions:</h2>
            <ul className="list-disc list-inside">
              {suggestedContent.map((suggestion, index) => (
                <li key={index} className="text-gray-700 mb-4">
                  <p>{suggestion}</p>
                  <button
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-lg"
                    onClick={() => handleUseSuggestion(suggestion)}
                  >
                    Use This Suggestion
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
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
