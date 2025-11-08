import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import {Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login= () => {
    const navigate= useNavigate();
    const [user, setFormData]= useState({
        nic: "",
        password: ""
    })

    function handleChange(e) {
        const {name, value}= e.target;
        setFormData((prev) => {
            return{...prev, [name]: value};
        });
    }

    const [errors, setFormErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {};
        if (!user.nic) errors.nic = "NIC is required";
        if (!user.password) errors.password = "Password is required";
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const url = "http://localhost:4000/login";
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                console.log("Data:", data);
                if (response.ok) {
                    console.log("Success:", data);
                    if(data.role=== 'Patient') {
                        console.log("Patient Page");
                    }
                    if(data.role=== 'Doctor') {
                        console.log("Doctor Page");
                        localStorage.setItem('user_id', data.user_id);
                        navigate('/doctor', {state: {user_id: data.user_id}});
                    }
                    if(data.role=== 'Pharmacist') {
                        console.log("Pharmacist Page");
                    }

                    
                } else {
                    setFormErrors({ general: data.error });
                }
            } catch (error) {
                setFormErrors({ general: "Network error, please try again." });
            }
    }
}


    
    return (
        <>
            <Navbar visibility={false} />
            <h2 className="text-center fw-light text-primary mt-5">Welcome to CareBridge</h2>
            <section className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8 col-md-6 col-lg-5 border p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
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
                            </div>

                            <div className="mb-3">
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
                            {errors.general && (
                                    <small className="text-danger">{errors.general}</small>
                            )}

                            <div className="d-grid mt-4">
                                <button className="btn btn-dark" type="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                        <p className="m-0 text-secondary text-end">
                            Don't have an account?{" "}
                            <Link to="/signup" className="link-primary text-decoration-none">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>    
        </>
    ); 
}

export default Login;