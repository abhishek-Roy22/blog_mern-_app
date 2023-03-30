import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import "./App.scss";
import Home from "./Pages/Home/Home";
import Write from "./Pages/Write/Write";
import SingleBlog from "./Pages/SingleBlog/SingleBlog";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/blogDetails/:id" element={<SingleBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
