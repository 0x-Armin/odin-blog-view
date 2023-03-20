import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((response) => {
        console.log(response.data);
        setBlogPosts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
      {blogPosts.map(item => <li key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.date_formatted}</p>
        <p>{item.content}</p>
        </li>)}
      </ul>
    </div>
  );
}

export default App;
