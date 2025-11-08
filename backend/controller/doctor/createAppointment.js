const connection = require("../../db/connection.js");

function createAppointment(request, response, user_id) {
    let data = "";
    request.on("data", chunk => { data += chunk.toString(); });
    console.log(user_id);
    request.on("end", ()=>{
        const parsedData= JSON.parse(data);
        const values= [
            parsedData.patient_id,
            user_id,
            parsedData.appointment_time,
            parsedData.complaints,
            parsedData.appointment_type,
            "APPROVED",
            parsedData.visit_mode
        ]
        const sql= `
        INSERT INTO APPOINTMENT
        (PATIENT_ID, DOCTOR_ID, APPOINTMENT_TIME, COMPLAINTS, APPOINTMENT_TYPE, STATUS, VISIT_MODE
        ) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        
        connection.query(sql, values, (error, result)=> {
            if(error) {
                console.error("Insert error:", error);
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Insert error" }));
            }
            else {
                console.log("Appointment created:", result);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Appointment created successfully!" }));
            }    
        });
    })
};

module.exports= createAppointment;