const connection = require("../../db/connection.js");

function updateAppointment(request, response, appointment_id) {
    let data = "";
    request.on("data", chunk => { data += chunk.toString(); });
    request.on("end", ()=>{
        const parsedData= JSON.parse(data);
        const time= parsedData.time;

        const sql= 'UPDATE APPOINTMENT SET APPOINTMENT_TIME=? WHERE APPOINTMENT_ID=?';
        const values= [time, appointment_id]
        
        connection.query(sql, values, (error, result)=> {
            if(error) {
                console.error("Update error:", error);
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Update error" }));
            }
            else {
                console.log("Appointment rescheduled:", result);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Appointment rescheduled successfully!" }));
            }    
        });
    })
};

module.exports= updateAppointment;