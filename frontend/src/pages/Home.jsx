import { useState, useEffect } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);
  console.log("posts:", posts);
  // console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <main>
      <div className="container p-4">
        <div>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </div>
        <div>
          {posts && posts.map((post) => <p key={post.id}>{post.name}</p>)}
        </div>
      </div>
    </main>
  );
}
