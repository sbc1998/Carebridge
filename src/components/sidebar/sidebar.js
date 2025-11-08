import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import './sidebar.css';

const Sidebar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  return (
    <>
    <div className="bg-dark text-white d-flex flex-column p-4" style={{ width: '235px' }}>
      <div className="text-center mb-5">
        <img
          src={props.profile}
          alt="Doctor"
          className="rounded-circle mb-3"
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
        <h5 className="mb-1 fw-light fs-5">Dr. {props.first_name} {props.last_name}</h5>
        <small className="fw-light">{props.specialization}</small>
      </div>
      <ul className="nav nav-pills flex-column fw-light fs-6 mb-auto">
        {[
          { label: 'Dashboard', icon: 'bi-speedometer2', link: '/doctor' },
          { label: 'Patients', icon: 'bi-person-lines-fill', link: '/doctor' },
          { label: 'Appointments', icon: 'bi-calendar-check', link: '/doctor' },
          { label: 'Messages', icon: 'bi-chat-dots', link: '/doctor' },
          { label: 'Settings', icon: 'bi-gear', link: '/profile' },
        ].map((item, idx) => (
          <li className="nav-item mb-3" key={idx}>
            <Link 
              to={item.link}
              className="nav-link text-white px-3 py-2 rounded"
            >
            
              <i className={`bi ${item.icon} me-2`}></i> {item.label}
            
            </Link>
          </li>
        ))}
          <li className="nav-item mt-4">
            <button onClick={handleLogout} className="nav-link logout-btn text-white px-3 py-2 rounded btn-dark">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </li>
      </ul>
    </div>



    </>
  );
};

export default Sidebar;
