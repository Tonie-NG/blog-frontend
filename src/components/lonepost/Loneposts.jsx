import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./loneposts.css";

function Loneposts() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log("Couldn't fetch single post");
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  const PF = "http://localhost:5000/images/";
  return (
    <div className="lonepost">
      <div className="lonepostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="lonepostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="lonepostTitleInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="lonepostTitle">
            {title}
            {post.username === user?.username && (
              <div className="lonepostEdit">
                <i
                  className="lonepostIcon fa fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="lonepostIcon fa fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="lonepostInfo">
          <span className="lonepostAuthor">
            Author:{" "}
            <Link
              to={`/?user=${post.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="lonepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>{" "}
        {updateMode ? (
          <textarea
            value={desc}
            className="lonepostDescriptionInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="lonepostDescription">{desc}</p>
        )}
        {updateMode && (
          <button className="lonepostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default Loneposts;
