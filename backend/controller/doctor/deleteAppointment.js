const connection = require("../../db/connection.js");

function deleteAppointment(request, response, appointment_id) {
    
        const sql= `DELETE FROM APPOINTMENT WHERE APPOINTMENT_ID= ?`;
        connection.query(sql, appointment_id, (error, result)=> {
            if(error) {
                console.error("Delete error:", error);
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Delete error" }));
            }
            else {
                console.log("Appointment deleted:", result);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Appointment deleted successfully!" }));
            }    
        });
    }

module.exports= deleteAppointment;