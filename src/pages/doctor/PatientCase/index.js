import React from 'react';
import Sidebar from "../../../components/sidebar/sidebar";
import Navbar from '../../navbar/navbar';

const PatientCase = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar visibility={false} />

      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar
          first_name={"Milan"}
          last_name={"Chhetri"}
          specialization={"Surgeon"}
        />

        {/* Main Content */}
        <div className="container-fluid p-4">
          <div className="row g-4">
            
            {/* Left Column */}
            <div className="col-md-5">
              <div
                className="p-4 rounded-4 border"
                style={{ backgroundColor: '#E8DFCA' }}
              >
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: '#0057b8' }}
                >
                  Patient Details
                </h5>

                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <span className="fw-semibold text-dark">Name:</span>
                    <span className="text-muted ms-2">John Doe</span>
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold text-dark">Complaints:</span>
                    <span className="text-muted ms-2">Headache, mild fever</span>
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold text-dark">Time:</span>
                    <span className="text-muted ms-2">10:30 AM</span>
                  </li>
                  <li className="mb-2">
                    <span className="fw-semibold text-dark">Appointment Type:</span>
                    <span className="text-muted ms-2">Follow-up</span>
                  </li>
                  <li>
                    <span className="fw-semibold text-dark">Visit Mode:</span>
                    <span className="text-muted ms-2">In-Person</span>
                  </li>
                </ul>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-primary rounded-pill"
                    style={{ background: '#0057b8' }}
                  >
                    Past Records
                  </button>
                  <button
                    className="btn btn-sm btn-primary rounded-pill"
                    style={{ background: '#0057b8' }}
                  >
                    Related Records
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-7">
              <div className="p-4 rounded-4 border bg-white">
                <h5
                  className="fw-semibold mb-3"
                  style={{ color: '#0057b8' }}
                >
                  Medical Record
                </h5>

                {/* Record Date (Static) */}
                <p className="mb-3">
                  <span className="fw-semibold text-dark">Record Date:</span>
                  <span className="text-muted ms-2">15 Nov 2025</span>
                </p>

                {/* Symptoms */}
                <div className="mb-3">
                  <label htmlFor="symptoms" className="form-label">
                    Symptoms
                  </label>
                  <textarea
                    className="form-control"
                    name="symptoms"
                    id="symptoms"
                    rows="2"
                    placeholder="Enter patient symptoms"
                  ></textarea>
                </div>

                {/* Lab Test */}
                <div className="mb-3">
                  <label htmlFor="labTest" className="form-label">
                    Lab Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="labTest"
                    id="labTest"
                    placeholder="Enter lab test details"
                  />
                </div>

                {/* Diagnosis */}
                <div className="mb-3">
                  <label htmlFor="diagnosis" className="form-label">
                    Diagnosis
                  </label>
                  <textarea
                    className="form-control"
                    name="diagnosis"
                    id="diagnosis"
                    rows="2"
                    placeholder="Enter diagnosis"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mt-3">
                  <button className="btn btn-sm btn-success">
                    Save
                  </button>
                  <button className="btn btn-sm btn-dark text-white">
                    Create Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Cards Below */}
          <div className="row g-4 mt-3">
            {/* Lab Test Card */}
            <div className="col-md-6">
              <div className="p-3 rounded-4 border bg-white">
                <h5 className="fw-semibold mb-3" style={{ color: '#0057b8' }}>
                  Lab Test
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-file-earmark-medical fs-3 text-primary me-3"></i>
                    <div>
                      <span className="fw-semibold text-dark">Blood Test</span> <br />
                      <span className="badge bg-info text-dark">Requested</span>
                    </div>
                  </div>  
                  <button className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Follow-up Records Card */}
            <div className="col-md-6">
              <div className="p-3 rounded-4 border bg-white">
                <h5 className="fw-semibold mb-3" style={{ color: '#0057b8' }}>
                  Follow-up Records
                </h5>
                <p className="text-muted">No follow-up records yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCase;
