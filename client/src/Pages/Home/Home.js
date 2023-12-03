import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";

function Home() {
  const { name, isAuthenticated } = useSelector((state) => state);

  return (
    <div className="home">
      {!isAuthenticated ? (
        <div className="home__left">
          <h1>
            Welcome to{" "}
            <span className="name">Cryptography: Password Manager</span>
          </h1>

          <p>
            An application dedicated to generating, storing, and managing your
            encrypted passwords securely.
          </p>

          <Link to="/signup" className="signup-link">
            Sign Up Now
          </Link>
          <Link to="/signin" className="signin-link">
            Sign In Now
          </Link>
        </div>
      ) : (
        <div className="home__left">
          <h1>
            Welcome to Cryptex <span className="name">{name}</span>
          </h1>

          <p> Your vault for encrypted password storage and management. </p>

          <Link to="/passwords" className="password-btn"> Securely Manage Your Passwords </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
