import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Singlepost from "./pages/singlepost/Singlepost";
import Write from "./pages/write/Write";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Singlepost />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
