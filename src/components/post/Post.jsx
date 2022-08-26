import { Link } from "react-router-dom";
import "./post.css";

function Post({ post }) {
  // const PF = "localhost:5000/images/";
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImage" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map((cat) => (
            <span className="postCategory">{cat.name}</span>
          ))}
        </div>
        <Link
          to={`/post/${post._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.desc}</p>
    </div>
  );
}

export default Post;
