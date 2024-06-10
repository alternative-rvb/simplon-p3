import { useState, useEffect } from "react";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  console.log('items:', items)

  useEffect(() => {
    fetch(`/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="App">
      <Home />
      <p>
        {items && items.map((item) => <p key={item.id}>{item.title}</p>)}
      </p>
    </div>
  );
}

export default App;
