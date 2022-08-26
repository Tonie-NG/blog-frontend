import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";

function Home() {
  const [post, setPost] = useState([]);
  const { search } = useLocation();
  // console.log(location);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPost(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts className="homepost" post={post} />
      </div>
    </>
  );
}

export default Home;
