import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from '../../pages/navbar/navbar';
import './profile.css';

const Profile = () => {
  // State to manage toast visibility
  const [showToast, setShowToast] = useState(false); 
  useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showToast]);


  const user_id= parseInt(localStorage.getItem('user_id'));
  const [doctor, setDoctorData]= useState({
            FIRST_NAME: "",
            LAST_NAME: "",
            PHONE_NUMBER: "",
            GENDER: "",
            SPECIALIZATION: "",
            ADDRESS: "",
            EMAIL: "",
            EXPERIENCE: "",
            LICENSE: "",
            PROFILE_URL: ""
  
  })

  async function fetchDoctor() {
              try {
                  const response = await fetch(`http://localhost:4000/doctor/${user_id}`);
                  const data = await response.json(); 
                  setDoctorData(data);
              } catch (error) {
                  console.error("Error fetching doctor:", error);
              }
          }

  useEffect(() => {
    fetchDoctor();
  }, [user_id]);

  const [updateDoctor, setUpdateDoctor]= useState({
            FIRST_NAME: "",
            LAST_NAME: "",
            PHONE_NUMBER: "",
            SPECIALIZATION: "",
            ADDRESS: "",
            EMAIL: "",
            EXPERIENCE: "",
            LICENSE: "",
            PROFILE_URL: ""
  
  })

  function handleChange(e) {
    const {name, type, value, files}= e.target;
    let newValue;
    setUpdateDoctor((prev)=>{
      if (type === "file") {
        newValue = files[0] || null;
      }
      else {
        newValue= value;
      }
      return{...prev, [name]: newValue};
    })
  }
 
  //to update doctor profile
  async function handleSubmit(e) {
    e.preventDefault();
    const formData= new FormData();
    const url= `http://localhost:4000/doctor/update/${user_id}`;
    const options= {
      method: "POST",
      body: formData
    }

    Object.entries(updateDoctor).forEach(([key, value]) => {
      if(value !== "" && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response= await fetch(url, options);
      if (response.ok) {
        setShowToast(true);
        fetchDoctor();
      }
    }
    catch(error) {
      console.log("Error updating data:", error);
    }
  
  }

  return (
    <>
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
            Changes Saved!
          </div>
        </div>
      </div>
    <Navbar visibility={false} />
    <div className="d-flex" style={{ minHeight: '100vh' }}>
        
        {/* Sidebar */}
        <Sidebar 
            first_name={doctor.FIRST_NAME} 
            last_name= {doctor.LAST_NAME} 
            specialization={doctor.SPECIALIZATION}
            profile= {doctor.PROFILE_URL}
        />

    <div className="d-flex" style={{ minHeight: '100vh' }}>
      
      <div className="flex-grow-1 p-4">
        <div className="container edit-profile-container">
          <div className="card border p-4">
            <h3 className="mb-4 fw-light text-center text-primary">Edit Profile</h3>
            <div className="text-center mb-4 position-relative" style={{ width: '130px', margin: '0 auto' }}>
              <img
                src={doctor.PROFILE_URL}
                alt="Doctor"
                className="rounded-circle mb-3"
                style={{ width: '130px', height: '130px', objectFit: 'cover' }}
              />
              <label htmlFor="profileUpload" className="edit-icon">
                <i className="bi bi-pencil"></i>
              </label>
              <input
                type="file"
                id="profileUpload"
                name="PROFILE_URL"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
            </div>
   
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" placeholder="Enter first name" name="FIRST_NAME" onChange={handleChange} value={updateDoctor.FIRST_NAME || doctor.FIRST_NAME}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" placeholder="Enter last name" name="LAST_NAME" onChange={handleChange} value={updateDoctor.LAST_NAME || doctor.LAST_NAME}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Specialization</label>
                  <input type="text" className="form-control" placeholder="e.g. Cardiology" name="SPECIALIZATION" onChange={handleChange} value={updateDoctor.SPECIALIZATION || doctor.SPECIALIZATION}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="Enter address" name="ADDRESS" onChange={handleChange} value={updateDoctor.ADDRESS || doctor.ADDRESS}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="Enter email" name="EMAIL" onChange={handleChange} value={updateDoctor.EMAIL || doctor.EMAIL}/>
                </div>
                 <div className="col-md-6">
                    <label className="form-label"> Phone Number </label>
                    <input type="phone" className="form-control" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="PHONE_NUMBER" onChange={handleChange} value={updateDoctor.PHONE_NUMBER || doctor.PHONE_NUMBER}/>
                </div>    
                <div className="col-md-6">
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" className="form-control" placeholder="e.g. 5" name="EXPERIENCE" onChange={handleChange} value={updateDoctor.EXPERIENCE || doctor.EXPERIENCE}/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">License Number</label>
                  <input type="text" className="form-control" placeholder="Enter license number" name="LICENSE" onChange={handleChange} value={updateDoctor.LICENSE || doctor.LICENSE}/>
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-dark">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Profile;
