import { useState, useEffect } from "react";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  console.log('items:', items)

  // console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="App">
      <Home />
      <div>
        {items && items.map((item) => <p key={item.id}>{item.title}</p>)}
      </div>
    </div>
  );
}

export default App;
