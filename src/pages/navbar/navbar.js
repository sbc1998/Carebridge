import React from "react";
import carebridge_Logo from '../../assets/carebridge_logo.svg';
import { Link } from "react-router-dom";

const Navbar = ({visibility}) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-4" style={{ backgroundColor: '#0071E3' }}>
        <div className="container">
            <Link to="/home" className="navbar-brand d-flex align-items-center gap-2">
                <img src={carebridge_Logo} alt="CareBridge Logo" className="img-fluid" style={{ height: 45 + 'px' }} />
                <span className="fs-3 text-white fw-light">CareBridge</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {visibility && ( 

                <>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link text-white fw-light fs-6" href="#">Care at CareBridge</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white fw-light fs-6" href="#">Health Library</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white fw-light fs-6" href="#">For Medical Professionals</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white fw-light fs-6" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            More
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                    {/* Signup & Login Buttons  */}
                    <div className="d-flex gap-2">
                        <Link to="/signup" className="btn cursor-pointer bg-black text-white"><i className="bi-person-plus-fill me-2"></i>Sign Up</Link>
                        <Link to="/login" className="btn cursor-pointer bg-black text-white"><i className="bi-box-arrow-in-right me-2"></i>Login</Link>
                    </div>
                </>    
            )}

          
        </div>
      </nav>
    </>
  );
};

export default Navbar;