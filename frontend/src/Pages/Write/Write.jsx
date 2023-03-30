import "./Write.scss";
import { useState } from "react";
import { useBlogsContext } from "../../hooks/useBlogsContext";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { dispatch } = useBlogsContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { title, desc };

    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setDesc("");
      dispatch({ type: "CREATE_BLOG", payload: json });
      navigate("/");
    }
  };

  return (
    <div className="write">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <div className="editorContainer">
          <textarea
            id="editor"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write desc..."
            className={emptyFields.includes("desc") ? "error" : ""}
          ></textarea>
        </div>
        <button type="submit">Publish</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};
export default Write;
