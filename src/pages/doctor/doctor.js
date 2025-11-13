import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from '../navbar/navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import './doctor.css';

const Doctor = () => {
  const user_id = parseInt(localStorage.getItem('user_id'));

  // List of appointments
  const [appointments, setAppointments] = useState([]);
  console.log("total appointment list:", appointments);

  // Single appointment form (create / reschedule)
  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: "",
    appointment_time: "",
    complaints: "",
    appointment_type: "",
    visit_mode: ""
  });

  // Selected appointment for rescheduling
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Toast visibility
  const [showToast, setShowToast] = useState(false);

  //to make form input readonly
  const [editable, setEditable] = useState(true);

  //number of appointments
  const [appointmentsCount, setAppointmentsCount]= useState({
    total: 0,
    approved: 0,
    pending: 0,
    cancelled: 0
  });

  // Doctor info
  const [doctor, setDoctor] = useState({
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
  });

  // To get total number of appointments
  async function calculateAppointmentsCount() {
    try {
      const url = `http://localhost:4000/doctor/${user_id}/appointments/counts`;
      const response = await fetch(url);
      const data = await response.json();

      const approved_number =
        data.find(({ STATUS }) => STATUS === "APPROVED")?.appointment_count || 0;

      const pending_number =
        data.find(({ STATUS }) => STATUS === "PENDING")?.appointment_count || 0;

      const cancelled_number =
        data.find(({ STATUS }) => STATUS === "CANCELLED")?.appointment_count || 0;

      const total_number = approved_number + pending_number + cancelled_number;

      setAppointmentsCount({
        total: total_number,
        approved: approved_number,
        pending: pending_number,
        cancelled: cancelled_number,
      });
    } catch (error) {
      console.error("Error getting appointments count:", error);
    }
  }

  useEffect(() => {
    calculateAppointmentsCount();
  }, [user_id]);

  // Fetch appointments
  async function fetchAppointments() {
    try {
      const response = await fetch(`http://localhost:4000/appointment/${user_id}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, [user_id]);


  // Fetch doctor info
  useEffect(() => {
    async function fetchDoctor() {
      try {
        const response = await fetch(`http://localhost:4000/doctor/${user_id}`);
        const data = await response.json();
        console.log("Doctor info:", data);
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    }
    fetchDoctor();
  }, [user_id]);

  // Handle form changes
  function handleChange(e) {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({ ...prev, [name]: value }));
  }

  // Submit appointment (create / reschedule)
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = {};
    if (!appointmentForm.patient_id) validationErrors.patient_id = "Patient ID is required";
    else if (!/^\d{9}$/.test(appointmentForm.patient_id)) validationErrors.patient_id = "Patient ID must be 9 digits";
    if (!appointmentForm.appointment_time) validationErrors.appointment_time = "Appointment time is required";
    if (!appointmentForm.complaints) validationErrors.complaints = "Complaint is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const url = selectedAppointment
        ? `http://localhost:4000/doctor/updateAppointment/${selectedAppointment.APPOINTMENT_ID}`
        : `http://localhost:4000/doctor/createAppointment/${user_id}`;

      let payload= {};
      selectedAppointment?  
      payload= {
        time: appointmentForm.appointment_time
      }:
      payload= {
        patient_id: appointmentForm.patient_id,
        appointment_time: appointmentForm.appointment_time,
        complaints: appointmentForm.complaints,
        appointment_type: appointmentForm.appointment_type,
        visit_mode: appointmentForm.visit_mode
      }  

      const options = {
        method: selectedAppointment ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Appointment response:", data);

        // Hide modal
        const myModalEl = document.getElementById('createAppointmentModal');
        const modal = bootstrap.Modal.getInstance(myModalEl);
        if (modal) {
          modal.hide();
          setTimeout(() => {
            document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
            document.body.classList.remove('modal-open');
          }, 200);
        }

        //Reset form and selection
        setSelectedAppointment(null);
        setAppointmentForm({
          patient_id: "",
          appointment_time: "",
          complaints: "",
          appointment_type: "",
          visit_mode: ""
        });

        // Show toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        // Refresh appointments
        // const refreshResponse = await fetch(`http://localhost:4000/appointment/${user_id}`);
        // const refreshedData = await refreshResponse.json();
        // setAppointments(refreshedData);

        fetchAppointments();
        calculateAppointmentsCount();

      } catch (error) {
        console.error("Error submitting appointment:", error.message);
      }
    }
  }

  // Populate form when an appointment is selected for reschedule
  useEffect(() => {
  if (selectedAppointment) {
    setAppointmentForm({
      patient_id: selectedAppointment.PATIENT_ID || '',
      appointment_time: selectedAppointment.APPOINTMENT_TIME
        ? new Date(selectedAppointment.APPOINTMENT_TIME).toISOString().slice(0, 16)
        : '',
      complaints: selectedAppointment.COMPLAINTS || '',
      appointment_type: selectedAppointment.APPOINTMENT_TYPE || '',
      visit_mode: selectedAppointment.VISIT_MODE || '',
    });
  } else {
    setAppointmentForm({
      patient_id: '',
      appointment_time: '',
      complaints: '',
      appointment_type: '',
      visit_mode: '',
    });
  }
}, [selectedAppointment]);

//to cancel and delete appointment from database
async function cancelAppointment(appointment_id) {
      try {
        const url= `http://localhost:4000/deleteAppointment/${appointment_id}`;
        const options= {
          method: 'DELETE'
        }
        await fetch(url, options);
        //update appointment state after cancelling appointment
        // setAppointments((prev)=> prev.filter((item)=> item.APPOINTMENT_ID !== appointment_id));
        await fetchAppointments();
        await calculateAppointmentsCount();
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
}
  return (
    <>
      {/* Toast */}
      <div className="toast-container position-fixed top-0 end-0 p-3">
        <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-body">
            Appointment {selectedAppointment ? "rescheduled" : "created"} successfully!
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar visibility={false} />

      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar
          first_name={doctor.FIRST_NAME}
          last_name={doctor.LAST_NAME}
          specialization={doctor.SPECIALIZATION}
          profile={doctor.PROFILE_URL}
        />

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {/* Welcome & Report */}
          <div className="row g-4">
            <div className="col-md-8 d-flex flex-column gap-4">
              <div className="p-5 rounded-4" style={{ backgroundColor: '#E8DFCA' }}>
                <h2 className="fw-light text-dark mb-3">
                  Welcome Dr. {doctor.FIRST_NAME} {doctor.LAST_NAME}
                </h2>
                <p className="fw-light text-muted">
                  You have {appointmentsCount.total === 0 ? "no " : <strong> {appointmentsCount.total} </strong>}
 appointments scheduled today.
                </p>
                <p className="fw-light text-muted">
                  Let’s make today productive and positive 💙
                </p>
              </div>

              <div className="border rounded-4 p-4">
                <h5 className="fw-light mb-4 text-dark">Report</h5>
                <div className="row g-4">
                  {[
                    { label: 'Approved', value: '7', color: 'linear-gradient(135deg, #198754, #28a745)' },
                    { label: 'Total', value: '50', color: 'linear-gradient(135deg, #6f42c1, #a370f7)' },
                    { label: 'Pending', value: '3', color: 'linear-gradient(135deg, #ffc107, #ffda6a)' },
                    { label: 'Cancelled', value: '15', color: 'linear-gradient(135deg, #dc3545, #ff6b6b)' },
                  ].map((card, idx) => (
                    <div className="col-md-3" key={idx}>
                      <div className="p-4 rounded-4 text-center h-100" style={{ background: card.color }}>
                        <h6 className="fw-light text-muted">{card.label}</h6>
                        <h3 className="fw-bold text-dark mb-0">{card.value}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="h-100 p-4 rounded-4 text-center border d-flex flex-column justify-content-center" style={{ backgroundColor: '#fff' }}>
                <h5 className="fw-semibold text-warning mb-3">Quick Tip</h5>
                <i className="bi bi-heart-pulse fs-1 text-warning"></i>
                <p className="mt-3 text-muted">
                  Stay hydrated and encourage your patients to do the same!
                </p>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="border rounded-4 p-4 mt-4">
            <div className="d-flex align-items-center mb-4">
              <h5 className="fw-light text-dark mb-0 mx-3">Appointments</h5>
              <button
                data-bs-toggle="modal"
                data-bs-target="#createAppointmentModal"
                className="btn btn-sm btn-dark"
                onClick={() => setSelectedAppointment(null)}
              >
                Create Appointment
              </button>
            </div>

            <div className="row g-4 align-items-stretch">
              <div className="col-md-8">
                <ul className="list-group">
                  {appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <li
                        key={appt.APPOINTMENT_ID}
                        className="list-group-item py-3 px-4 d-flex justify-content-between align-items-center rounded-3 mb-3"
                        style={{ background: "#C0C9EE" }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={appt.PROFILE_URL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNUOgjEhHpfUqnVk-Tp2uN1AhrrzXhwdX9A&s"}
                            alt="patient"
                            className="rounded-circle"
                            style={{ width: "45px", height: "45px", objectFit: "cover" }}
                          />
                          <div className="d-flex flex-column">
                            <h6 className="mb-1 fw-light">{appt.FIRST_NAME} {appt.LAST_NAME}</h6>
                            <small className="fw-light text-muted">{appt.COMPLAINTS}</small>
                            <small className="text-muted">{new Date(appt.APPOINTMENT_TIME).toLocaleString()}</small>
                          </div>
                        </div>

                        <div className="d-flex flex-column align-items-end gap-2">
                          <p className="mb-1 text-muted fw-light fs-8" style={{ fontSize: "0.8rem"}}>Status: {appt.STATUS}</p>
                          <div className="d-flex gap-2">
                            {appt.STATUS !== "APPROVED" && (
                              <>
                                <button className="btn btn-sm text-white bg-primary rounded-pill">Approve</button>
                                <button className="btn btn-sm text-white rounded-pill" style={{ background: "#FF8282" }}>Cancel</button>
                              </>
                            )}
                            {appt.STATUS === "APPROVED" && (
                              <button className="btn btn-sm text-white bg-success rounded-pill">Check Patient</button>        
                            )}
                            <button
                              className="btn btn-sm text-white bg-primary rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target="#createAppointmentModal"
                              onClick={() => {
                                setSelectedAppointment(appt);
                                setEditable(false);
                              }}
                            >
                              Reschedule
                            </button>
                            <button
                              className="btn btn-sm text-white bg-danger rounded-pill"
                              onClick={()=> cancelAppointment(appt.APPOINTMENT_ID)} 
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-muted">No appointments found.</p>
                  )}
                </ul>
              </div>

              <div className="col-md-4">
                <div className="bg-white rounded-4 p-4 text-center border h-100 d-flex flex-column justify-content-center">
                  <i className="bi bi-calendar3 fs-1 text-muted"></i>
                  <p className="mt-3 text-muted">Calendar Widget Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="createAppointmentModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4 border rounded-4">
            <div className="modal-header">
              <h4 className="modal-title fw-light" id="createAppointmentLabel">
                {selectedAppointment ? "Reschedule Appointment" : "Create Appointment"}
              </h4>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
                onClick={()=> setEditable(true)}
              >
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="patient_id" className="form-label">Patient ID: <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="patient_id"
                    value={appointmentForm.patient_id}
                    placeholder="Enter Patient ID"
                    onChange={handleChange}
                    readOnly={!editable}
                  />
                  {errors.patient_id && <small className="text-danger">{errors.patient_id}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="appointment_time" className="form-label">Appointment Time: <span className="text-danger">*</span></label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="appointment_time"
                    value={appointmentForm.appointment_time}
                    onChange={handleChange}
                  />
                  {errors.appointment_time && <small className="text-danger">{errors.appointment_time}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="complaints" className="form-label">Complaints: <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    name="complaints"
                    value={appointmentForm.complaints}
                    rows="3"
                    placeholder="Describe complaints"
                    onChange={handleChange}
                  ></textarea>
                  {errors.complaints && <small className="text-danger">{errors.complaints}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="appointment_type" className="form-label">Appointment Type:</label>
                  <select
                    className="form-select"
                    name="appointment_type"
                    value={appointmentForm.appointment_type}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    <option value="initial">Initial</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="visit_mode" className="form-label">Visit Mode:</label>
                  <select
                    className="form-select"
                    name="visit_mode"
                    value={appointmentForm.visit_mode}
                    onChange={handleChange}
                  >
                    <option value="">Select mode</option>
                    <option value="online">Online</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-dark">{selectedAppointment ? "Update" : "Create"} Appointment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
