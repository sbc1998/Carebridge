import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#cce5ff", height: "80px" }}>
      <div className="container">
        <h2 className="navbar-brand" style={{ color: "black", fontSize: "34px", fontWeight: "bold" }}>
          Carebridge
        </h2>

        <div className="collapse navbar-collapse justify-content-end" id="navbarButtonsExample">
          <div className="d-flex align-items-center">
            <Link to="/" className="btn btn-primary btn-sm px-3 me-2">
              Home
            </Link>
            <Link to="/about" className="btn btn-primary btn-sm px-3 me-2">
              About
            </Link>
            <Link to="/login" className="btn btn-primary btn-sm me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm me-3">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
