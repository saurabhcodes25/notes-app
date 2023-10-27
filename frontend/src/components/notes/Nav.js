import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <nav className="main-nav">
      <div className="logo">
        <h2>
          <span>N</span>otes
          <span>A</span>pp
        </h2>
      </div>
      <ul className="menu">
        <li className="menu_item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu_item">
          <Link to="/create">Create Note</Link>
        </li>
        <li className=" menu_item" onClick={logoutSubmit}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
