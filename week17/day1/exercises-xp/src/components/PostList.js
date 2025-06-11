import React from 'react';
import postsData from '../data/posts.json';

function PostList() {
  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {postsData.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;