import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

function Write() {
  const [title, setTitle] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImage" />
      )}

      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup formOboy">
          <label htmlFor="fileInput">
            <li className="writeIcon fa fa-plus"></li>
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          />
          <input
            type="text"
            id="fileInput"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            name=""
            className="writeInput writeText"
            placeholder="Tell your story..."
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Write;
