import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBlog.scss";

const SingleBlog = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchblogDetails = async () => {
      setisLoading(true);
      const response = await fetch("/api/blogs/" + id);
      const json = await response.json();

      if (response.ok) {
        setisLoading(false);
        setBlogDetails(json);
      }
    };
    fetchblogDetails();
  }, [id]);

  return (
    <>
      {isLoading && <span className="loading">Loading...</span>}
      <div className="singleBlog">
        <div className="img">
          <img
            src="https://images.pexels.com/photos/7245314/pexels-photo-7245314.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="blog_img"
          />
        </div>
        <div className="single_blogAuth">
          <p className="author">Author:- Abhishek</p>
        </div>
        <h1>{blogDetails.title}</h1>
        <span>{blogDetails.desc}</span>
      </div>
    </>
  );
};

export default SingleBlog;
