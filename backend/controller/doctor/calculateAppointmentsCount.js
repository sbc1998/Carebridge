const connection = require("../../db/connection.js");

function calculateAppointmentsCount(request, response, user_id) {
  const sql = `
    SELECT 
      STATUS,
      COUNT(*) AS appointment_count
    FROM APPOINTMENT
    WHERE STATUS IN('APPROVED', 'CANCELLED', 'PENDING')
          AND DOCTOR_ID= ?
    GROUP BY STATUS; 
  `;

  connection.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end()
      return;
    }

    if (result.length > 0) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(result)); 
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: "No appointments found" }));
    }
  });
}

module.exports = calculateAppointmentsCount;
