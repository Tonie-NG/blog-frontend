import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.css";

function Navbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navIcon navLeft">
        <i className="navIcon fa-brands fa-square-facebook"></i>
        <i className="navIcon fa-brands fa-square-twitter"></i>
        <i className="navIcon fa-brands fa-linkedin"></i>
        <i className="navIcon fa-brands fa-hashnode"></i>
      </div>
      <div className="navCenter">
        <ul className="navList">
          <li className="navListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              HOME
            </Link>
          </li>
          <li className="navListItem">
            <Link
              to="/write"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              WRITE
            </Link>
          </li>
          <li className="navListItem" onClick={handleLogout}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {user && "LOG-OUT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="navRight">
        {user ? (
          <Link to="/settings">
            <img className="navImage" src={user.profilePicture} alt="" />
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              LOG-IN
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              REGISTER
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
