import React from "react";
import "./Blog.scss";
import { useBlogsContext } from "../../hooks/useBlogsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const { dispatch } = useBlogsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch("/api/blogs/" + blog._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
  };

  return (
    <div key={blog._id} className="blog">
      <div className="blog_wrapper">
        <div className="blog_img">
          <img
            src="https://images.pexels.com/photos/7245314/pexels-photo-7245314.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="blog_img"
          />
        </div>
        <div className="blog_cont">
          <Link className="link" to={`/blogDetails/${blog._id}`}>
            <h1>{blog.title.slice(0, 50)}...</h1>
          </Link>
          <span>{blog.desc.slice(0, 100)}...</span>
          <div className="blog_auth">
            {user && <p className="author">Author:- {user.email}</p>}
            <p className="date">
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <span
          onClick={handleDelete}
          className="material-symbols-outlined delete"
        >
          delete
        </span>
        <span className="material-symbols-outlined edit">edit_square</span>
      </div>
    </div>
  );
};

export default Blog;
