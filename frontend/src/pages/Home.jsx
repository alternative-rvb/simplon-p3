import { useState, useEffect } from "react";

function getFormattedDate() {
  // Crée une nouvelle instance de Date pour le 1er janvier 2024
  var date = new Date(); // Les mois en JavaScript sont indexés à partir de 0 (0 = janvier, 1 = février, etc.)

  // Formatte la date en format ISO (année-mois-jour)
  var formattedDate = date.toISOString().split("T")[0]; // Résultat : 2024-01-01

  return formattedDate;
}

export default function Home() {
  const initialState = {
    name: "Titre du post",
    image: "000",
    review: 1,
    category: "cat1",
    tags: "tag1,tag2",
    os: "Linux",
    website: "https://example.com",
    description: "Description du post...",
    featured: false,
    date: getFormattedDate(),
    users_id: 1,
  };
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(initialState);

  // console.log("post:", post);
  const [users, setUsers] = useState([]);
  // console.log("posts:", posts);
  // console.log("users:", users);
  // console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/users`),
        ]);

        if (!postsResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const posts = await postsResponse.json();
        const users = await usersResponse.json();
        const rPosts = posts.reverse();
        setPosts(rPosts);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [post]);

  function handleSubmit(e) {
    e.preventDefault();
    const formattedPost = {
      ...post,
      tags: JSON.stringify(post.tags.split(",")),
      os: JSON.stringify(post.os.split(",")),
    };
    console.log("post submitted:", formattedPost);
    handleAddPost(formattedPost);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") setPost((prev) => ({ ...prev, [name]: checked }));
    else setPost((prev) => ({ ...prev, [name]: value }));
  }

  const handleAddPost = async (newPost) => {
    console.log("newPost:", newPost);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Vérifier le contenu de la réponse

      if (!response.ok) {
        throw new Error(data.message || "Failed to create post");
      }
      setPosts((prevPosts) => [...prevPosts, data.post]);
      setPost(initialState);
    } catch (error) {
      console.error("Failed to add post", error);
    }
  };

  return (
    <main>
      <div className="container p-4">
        <div className="pb-4">
          <h1 className="text-3xl font-bold underline">Posts</h1>
        </div>
        <div className="flex gap-4">
          <div className="basis-1/2">
            <form
              className="flex flex-col gap-2 border border-black p-4"
              onSubmit={handleSubmit}
            >
              {/* Form inputs for post details */}
              {/* Name input */}
              <div className="mb-1">
                <label>Nom:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="name"
                  maxLength={20}
                  value={post.name}
                  onChange={handleChange}
                  placeholder="FreeCodeCamp"
                />
              </div>
              {/* Image URL input */}
              <div className="mb-1">
                <label>Image:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="image"
                  value={post.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              {/* Review input */}
              <div className="mb-1">
                <label>Review (1-5):</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="review"
                  value={post.review}
                  onChange={handleChange}
                />
              </div>
              {/* Category input */}
              <div className="mb-1">
                <label>Catégorie:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="category"
                  maxLength={20}
                  value={post.category}
                  onChange={handleChange}
                  placeholder="UX/UI"
                />
              </div>
              <div className="mb-1">
                <label>Tags:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="tags"
                  value={post.tags}
                  onChange={handleChange}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div>
                <label>OS:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="os"
                  value={post.os}
                  onChange={handleChange}
                  placeholder="Windows, Mac, Linux"
                />
              </div>
              {/* Website URL input */}
              <div className="mb-1">
                <label>URL du site:</label>
                <input
                  className="border border-black w-full px-2"
                  type="text"
                  name="website"
                  value={post.website}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              {/* Description input */}
              <div className="mb-1">
                <label>Description:</label>
                <textarea
                  className="border border-black w-full px-2"
                  name="description"
                  maxLength={200}
                  value={post.description}
                  onChange={handleChange}
                  placeholder="Description..."
                />
              </div>
              {/* Featured checkbox */}
              <div className="mb-1">
                <input
                  className="border border-black"
                  id="featured"
                  type="checkbox"
                  name="featured"
                  checked={post.featured} // Utilisation de `checked` pour lier l'état
                  onChange={handleChange} // Utilisation de handleChange pour gérer les changements
                />
                <label htmlFor="featured">Featured</label>
              </div>
              <input
                className="border border-black w-full px-2"
                id="userId"
                type="hidden"
                name="users_id"
                value={post.users_id}
              />
              {/* Submit button */}
              <div className="d-flex ai-c g-1">
                <button
                  className="bg-blue-500 text-white px-4 py-1"
                  type="submit"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
          <div className="basis-1/2">
            <div>
              {posts &&
                posts.map((post, index) => <p key={post.id}>{post.name}</p>)}
            </div>
            <hr />
            <div>
              {users &&
                users.map(
                  (user, index) => index < 5 && <p key={user.id}>{user.name}</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
