import React, { useEffect, useState } from "react";
import Blog from "../../components/Blogs/Blog";
import "./Home.scss";

import { useBlogsContext } from "../../hooks/useBlogsContext";

const Home = () => {
  const { blogs, dispatch } = useBlogsContext();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setisLoading(true);
      const response = await fetch("/api/blogs");

      const json = await response.json();

      if (response.ok) {
        setisLoading(false);
        dispatch({ type: "SET_BLOGS", payload: json });
      }
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="blogs">
        {isLoading && <span className="loading">Loading...</span>}
        {blogs && blogs.map((blog) => <Blog blog={blog} key={blog._id} />)}
      </div>
    </div>
  );
};

export default Home;
