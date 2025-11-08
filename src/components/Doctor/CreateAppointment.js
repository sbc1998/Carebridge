import React from "react";
import { Link } from "react-router-dom";

const CreateAppointment = () => {
  return (
    <>
      <div className="container mt-5" id="createAppointment">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4 border rounded-4">
            {/* <h1 className="mb-4 fw-light">Create Appointment</h1> */}
            <form>
              <div className="mb-3">
                <label htmlFor="patient_id" className="form-label">Patient ID:</label>
                <input type="text" className="form-control" name="patient_id" placeholder="Enter Patient ID" />
              </div>

              <div className="mb-3">
                <label htmlFor="doctor_id" className="form-label">Doctor ID:</label>
                <input type="text" className="form-control" name="doctor_id" placeholder="Enter Doctor ID" />
              </div>

              <div className="mb-3">
                <label htmlFor="appointment_time" className="form-label">Appointment Time:</label>
                <input type="datetime-local" className="form-control" name="appointment_time" />
              </div>

              <div className="mb-3">
                <label htmlFor="complaints" className="form-label">Complaints:</label>
                <textarea className="form-control" name="complaints" rows="3" placeholder="Describe complaints"></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="appointment_type" className="form-label">Appointment Type:</label>
                <select className="form-select" name="appointment_type">
                  <option value="initial">Initial</option>
                  <option value="follow-up">Follow-up</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="visit_mode" className="form-label">Visit Mode:</label>
                <select className="form-select" name="visit_mode">
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
                <button type="submit" className="btn btn-dark">Create Appointment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAppointment;
