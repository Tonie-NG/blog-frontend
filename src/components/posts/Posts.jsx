import Post from "../post/Post";
import "./posts.css";

function Posts({ post }) {
  return (
    <div className="posts">
      {post.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  );
}

export default Posts;
