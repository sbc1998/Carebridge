const connection = require("../../db/connection.js");

function calculateAppointmentsCount(request, response, user_id) {
  const sql = `
    SELECT s.status,
       COALESCE(COUNT(a.status), 0) AS appointment_count
FROM (
    SELECT 'APPROVED' AS status
    UNION ALL
    SELECT 'CANCELLED'
    UNION ALL
    SELECT 'PENDING'
) AS s
LEFT JOIN appointment a
       ON a.status = s.status
      AND a.doctor_id = ?
GROUP BY s.status;


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
      console.log("result:", result);
      debugger
      response.end(JSON.stringify(result)); 
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: "No appointments found" }));
    }
  });
}

module.exports = calculateAppointmentsCount;
