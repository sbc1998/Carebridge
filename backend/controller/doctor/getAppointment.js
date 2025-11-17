const connection = require("../../db/connection.js");

function getAppointment(request, response, user_id) {
  const sql = `
    SELECT 
      A.*,
      U.FIRST_NAME,
      U.LAST_NAME,
      U.PROFILE_URL
    FROM 
      APPOINTMENT A
    JOIN 
      USER U
    ON 
      A.PATIENT_ID = U.USER_ID
    WHERE 
      A.DOCTOR_ID = ?;
  `;

  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: err.message }));
      return;
    }

    if (result.length > 0) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result)); 
    } else {
      // console.log("no appt found");
      // debugger
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: "No appointments found" }));
    }
  });
}

module.exports = getAppointment;
