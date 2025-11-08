// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import carebridge_Logo from '../../assets/carebridge_logo.svg'

const Home = () => {
  return (
    <div>

      {/* Navigation */}
      <Navbar visibility={true} />

      {/* Hero section */}
      <section
        className="hero-section text-white d-flex align-items-center"
        style={{
          background: "url('https://plus.unsplash.com/premium_photo-1674760950095-3a25310175a7?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat",
          height: "80vh"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-12">
              <div className="bg-dark bg-opacity-50 p-4 rounded">
                <h1 className="display-4 fw-light">
                  Connecting Healthcare Professionals for Better Patient Care
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text + Image Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Side - Text */}
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <h1 className="text-primary display-2 fw-light">
                Healing starts here
              </h1>
              <h3 className="text-dark fw-light">
                The right answers the first time
              </h3>
              <p className="text-muted mt-3 fs-5">
                Effective treatment depends on getting the right diagnosis. 
                Our experts diagnose and treat the toughest medical challenges.
              </p>
              <a href="#" className="btn bg-dark text-white btn-lg rounded-pill mt-3">
                Learn more <span> <i class="bi bi-arrow-right"></i> </span>
              </a>
            </div>

            {/* Right Side - Image */}
            <div className="col-lg-6 col-md-12 text-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1664475709982-cddd13daa8d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthcare illustration"
                className="img-fluid"
                style={{ height: "650px", objectFit: "cover", width: "100%" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-5 border-muted" />

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Side - Image */}
            <div className="col-lg-6 col-md-12 text-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1661596404369-aaee67f719c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthcare illustration"
                className="img-fluid"
                style={{ height: "650px", objectFit: "cover", width: "100%" }}
              />
            </div>

            {/* Right Side - Text */}
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0 px-4">
              <h1 className="fw-light text-primary display-2">
                Care from Anywhere
              </h1>
              <h3 className="fw-light text-dark">
                Connect with your doctor on a secure video call
              </h3>
              <p className="mt-3 fs-5 text-muted">
                Skip the waiting room—our telemedicine platform lets you consult with 
                healthcare professionals from the comfort of your home. Get expert advice, 
                prescriptions, and treatment plans through private, encrypted video sessions.
              </p>
              <a href="#" className="btn bg-dark text-white btn-lg rounded-pill mt-3">
                Book a Video Consultation
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-5 border-muted" />

      {/* Title */}  
      <div className="text-center mb-5">
        <h2 className="fw-light text-primary display-4">Healthcare Professional Services</h2>
        <p className="text-muted fs-5">
          Comprehensive tools and resources designed for healthcare professionals to deliver exceptional patient care
        </p>
      </div>  
      <div className="row g-5 px-5 mb-5">
        {/* For Physicians */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 text-center border-0 shadow p-4">
            <div className="card-body">
              <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-info text-white rounded-circle" style={{ width: '75px', height: '75px' }}>
                <i className="bi bi-clipboard2-pulse-fill fs-3"></i>
              </div>
              <h5 className="text-primary fw-light fs-3 mb-3">For Physicians</h5>
              <p className="text-muted fs-6 mb-4">
                Comprehensive patient management with digital prescriptions, symptom documentation, and care coordination tools.
              </p>
              <ul className="list-unstyled text-start fs-6">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Digital prescription system
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Patient record management
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Care team collaboration
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* For Patients */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 text-center border-0 shadow p-4">
            <div className="card-body">
              <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle" style={{ width: '75px', height: '75px' }}>
                <i className="bi bi-person-fill fs-3"></i>
              </div>
              <h5 className="text-primary fw-light fs-3 mb-3">For Patients</h5>
              <p className="text-muted fs-6 mb-4">
                Access your health records, schedule appointments, and consult doctors online for convenient care.
              </p>
              <ul className="list-unstyled text-start fs-6">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Online appointment booking
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Access medical history
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Telemedicine consultations
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* For Pharmacists */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 text-center border-0 shadow p-4">
            <div className="card-body">
              <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '75px', height: '75px' }}>
                <i className="bi bi-capsule fs-3"></i>
              </div>
              <h5 className="text-primary fw-light fs-3 mb-3">For Pharmacists</h5>
              <p className="text-muted fs-6 mb-4">
                Manage prescriptions efficiently, track inventory, and ensure timely medication delivery.
              </p>
              <ul className="list-unstyled text-start fs-6">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Prescription management
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Inventory tracking
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Medication alerts
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* For Lab Technicians */}
        <div className="col-lg-3 col-md-6">
          <div className="card h-100 text-center border-0 shadow p-4">
            <div className="card-body">
              <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-warning text-white rounded-circle" style={{ width: '75px', height: '75px' }}>
                <i className="bi bi-heart-pulse fs-3"></i>
              </div>
              <h5 className="text-primary fw-light fs-3 mb-3">For Lab Technicians</h5>
              <p className="text-muted fs-6 mb-4">
                Streamline lab tests, manage results, and collaborate with doctors for accurate patient diagnostics.
              </p>
              <ul className="list-unstyled text-start fs-6">
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Test management
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Result tracking
                </li>
                <li className="d-flex align-items-center mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> Doctor collaboration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer */}    
      <footer className="bg-primary text-white py-5">
        <div className="container">
          <div className="row g-4">
            {/* Logo and Description */}
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center mb-3">
                <img src={carebridge_Logo} alt="CareBridge Logo" className="img-fluid me-2" style={{ height: '45px' }} />
                <span className="fs-4 fw-light text-white">CareBridge</span>
              </div>
              <p className="text-white-50 fw-light">
                Connecting healthcare professionals for better patient outcomes and 
                streamlined care coordination.
              </p>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white fw-light">Services</h5>
              <ul className="list-unstyled fw-light">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">For Physicians</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">For Lab Technicians</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">For Pharmacists</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">For Patients</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white fw-light">Support</h5>
              <ul className="list-unstyled fw-light">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Training Resources</a></li>
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Technical Support</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white fw-light">Contact</h5>
              <ul className="list-unstyled fw-light">
                <li className="mb-2">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <a href="tel:1-800-CAREBRIDGE" className="text-white-50 text-decoration-none">1-800-CAREBRIDGE</a>
                </li>
                <li className="mb-2">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href="mailto:support@carebridge.com" className="text-white-50 text-decoration-none">support@carebridge.com</a>
                </li>
                <li>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  <span className="text-white-50">Healthcare District, Medical City</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-4 border-light opacity-25" />

          {/* Footer Bottom */}
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-white-50 fw-light mb-0">&copy; 2025 CareBridge. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end fw-light">
              <a href="#" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-white-50 text-decoration-none me-3">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
