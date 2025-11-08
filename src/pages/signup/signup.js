import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";

const Signup = () => {

  const initialFormState= {
    nic: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    specialization: "",
    experience: "",
    license: "",
    password: "",
    agree: false,
    profile: "",
  }

  const [user, setFormData] = useState(initialFormState);

  // State to manage toast visibility
  const [showToast, setShowToast] = useState(false);

  const handleChange = (event) => {
    const { name, type, value, checked, files } = event.target;
    let newValue;
    setFormData((prev) => {
      if (type === "checkbox") {
        newValue = checked;
      } else if (type === "file") {
        newValue = files[0] || null;
      } else {
        newValue = value;
      }
      return { ...prev, [name]: newValue };
    });
  };

  const [errors, setFormErrors] = useState({});
  const validateForm = function () {
    const errors = {};
    if (!user.nic || !/^\d{9}$/.test(user.nic))
      errors.nic = "NIC must be 9 digits and should be number";
    if (!user.firstName) errors.firstName = "First Name is required";
    if (!user.lastName) errors.lastName = "Last Name is required";
    if (!user.gender) errors.gender = "Gender is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.phone) errors.phone = "Phone number is required";
    if (!user.address) errors.address = "Address is required";
    if (!user.profile) errors.profile = "Profile image is required";
    if (!user.role) errors.role = "Role is required";
    if (user.role === "Doctor" && !user.specialization)
      errors.specialization = "Specialization is required";
    if (user.role === "Doctor" && !user.experience)
      errors.experience = "Experience is required";
    if ((user.role === "Doctor" || user.role === "Pharmacist") && !user.license)
      errors.license = "License number is required";
    if (!user.password || user.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!user.agree) errors.agree = "You must agree to the terms";
    console.log("errors:", errors);
    return errors;
  };

  const [serverErrors, setServerErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    //create FormData
    const formData= new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    console.log(user);
    const url = "http://localhost:4000/signup";
    const options = {
      method: "POST",
      body: formData,
    };
    
    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setServerErrors(data.errors || {});
          setShowToast(false);
          console.log("Fetch error:", data.message || `HTTP error! status: ${res.status}`);
        }
        else {
          setServerErrors({});
          setShowToast(true);
          setFormData({...initialFormState});
          console.log("Fetch response from backend:", data.message);
        }
      })
      .catch((error) => console.log("Fetch error:", error.message));
  };

  return (
    <>
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
            Sign-up successful!
            <div className="mt-2 pt-2 border-top">
              <Link to="/login"> 
                <button type="button" class="btn btn-dark btn-sm mx-2">Login</button>
              </Link>   
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="toast"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Navbar visibility={false} />
      <form onSubmit={handleSubmit}>
        <section className="p-1 p-md-4 p-xl-1 my-3">
          <div className="container">
            {/* Left Side Welcome */}
            <div className="row">
              <div className="col-12 col-md-6 text-bg-white">
                <div className="d-flex align-items-start justify-content-center h-100">
                  <div className="col-10 col-xl-8 py-3" style={{ marginTop: "7rem" }}>
                    <h2 className="h1 mb-4 fw-light text-primary">Sign up to collaborate, care, and make a difference</h2>
                    <p className="m-0">Note: You need a National Identity Card (NIC) number to register.</p>
                  </div>
                </div>
              </div>

              {/* Right Side Form */}
              <div className="col-12 col-md-6 bsb-tpl-bg-lotion border">
                <div className="p-3 p-md-4 p-xl-3">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="fs-6 fw-normal text-secondary mb-3">
                        Enter your details to register
                      </h3>
                    </div>
                  </div>

                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    {/* NIC */}
                    <div className="col-12">
                      <label htmlFor="nic" className="form-label">
                        NIC Number: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nic"
                        value={user.nic}
                        onChange={handleChange}
                        id="nic"
                        placeholder="NIC Number"
                      />
                      {errors.nic && (
                        <small className="text-danger">{errors.nic}</small>
                      )}
                      {serverErrors.nic && (
                        <small className="text-danger">{serverErrors.nic}</small>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="col-12">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        id="firstName"
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <small className="text-danger">{errors.firstName}</small>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="col-12">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        id="lastName"
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <small className="text-danger">{errors.lastName}</small>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="col-12">
                      <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        value={user.gender}
                        className="form-select"
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <small className="text-danger">{errors.gender}</small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="name@example.com"
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                      {serverErrors.email && (
                        <small className="text-danger">{serverErrors.email}</small>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="phone"
                        className="form-control"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        id="phone"
                        placeholder="123-456-7890"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      />
                      {errors.phone && (
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        id="address"
                      />
                      {errors.address && (
                        <small className="text-danger">{errors.address}</small>
                      )}
                    </div>

                    {/* Profile */}
                    <div className="col-12">
                      <label htmlFor="profile" className="form-label">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="profile"
                        onChange={handleChange}
                        id="profile"
                      />
                      {errors.profile && (
                        <small className="text-danger">{errors.profile}</small>
                      )}
                    </div>

                    {/* Role */}
                    <div className="col-12">
                      <label htmlFor="role" className="form-label">
                        Role: <span className="text-danger">*</span>
                      </label>
                      <select
                        value={user.role}
                        className="form-select"
                        id="role"
                        name="role"
                        onChange={handleChange}
                      >
                        <option value="">-- Select Role --</option>
                        <option value="Patient">Patient</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Pharmacist">Pharmacist</option>
                      </select>
                      {errors.role && (
                        <small className="text-danger">{errors.role}</small>
                      )}
                    </div>

                    {/* Specialization (only show if Doctor is selected) */}
                    {user.role === "Doctor" && (
                      <div className="col-12">
                        <label htmlFor="specialization" className="form-label">
                          Specialization <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="specialization"
                          id="specialization"
                          value={user.specialization}
                          onChange={handleChange}
                          placeholder="Specialization"
                        />
                        {errors.specialization && (
                          <small className="text-danger">
                            {errors.specialization}
                          </small>
                        )}
                      </div>
                    )}

                    {/* Experience (only show if Doctor is selected) */}
                    {user.role === "Doctor" && (
                      <div className="col-12">
                        <label htmlFor="experience" className="form-label">
                          Experience <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="experience"
                          id="experience"
                          value={user.experience}
                          onChange={handleChange}
                          placeholder="Experience"
                        />
                        {errors.experience && (
                          <small className="text-danger">
                            {errors.experience}
                          </small>
                        )}
                      </div>
                    )}

                    {(user.role === "Doctor" || user.role === "Pharmacist") && (
                      <div className="col-12">
                        <label htmlFor="license" className="form-label">
                          License No<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="license"
                          id="license"
                          value={user.license}
                          onChange={handleChange}
                          placeholder="License No"
                        />
                        {errors.license && (
                          <small className="text-danger">{errors.license}</small>
                        )}
                      </div>
                    )}

                    {/* Password */}
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        id="password"
                      />
                      {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                      )}
                    </div>

                    {/* Agreement */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="agree"
                          checked={user.agree}
                          onChange={handleChange}
                          id="iAgree"
                        />
                        <label
                          className="form-check-label text-secondary"
                          htmlFor="iAgree"
                        >
                          I agree to the{" "}
                          <a
                            href="#!"
                            className="link-primary text-decoration-none"
                          >
                            terms and conditions
                          </a>
                        </label>
                      </div>
                      {errors.agree && (
                        <small className="text-danger">{errors.agree}</small>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-dark"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="m-0 text-secondary text-end">
                        Already have an account?{" "}
                        <Link to="/login" className="link-primary text-decoration-none">
                          Log in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Signup;