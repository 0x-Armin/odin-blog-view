import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";

import api from "./api";

function App() {
  return (
    <Router>
      <div>
        <h1>Blog</h1>
        <Routes>
          <Route exact path="/posts" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <p>{post.date_formatted}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Post() {
  const { id } = useParams();
  const [postPackage, setPostPackage] = useState(null);

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        setPostPackage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!postPackage) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{postPackage.post.title}</h2>
      <p>{postPackage.post.date_formatted}</p>
      <p>{postPackage.post.content}</p>
      <h3>Comments</h3>
      <ul>
      {postPackage.comments.map((comment) => (
          <li key={comment.id}>
            <h4>{comment.username}</h4>
            <p>{comment.date_formatted}</p>
            <p>{comment.content}</p>
          </li>
        ))} 
      </ul>
    </div>
  );
}

export default App;
