const connection = require("../db/connection.js");

function doctor(request, response, user_id) {
    const values= [user_id, 'DOCTOR'];
    const sql= `SELECT FIRST_NAME, LAST_NAME, PHONE_NUMBER, GENDER, SPECIALIZATION, ADDRESS, EMAIL, EXPERIENCE,
                 LICENSE, PROFILE_URL FROM USER WHERE USER_ID= ? AND ROLE= ? `;

    connection.query(sql, values, (error, result) => {
        if(error) {
            console.error("Database error:", error);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: "Internal Server Error" }));
        }
        else {
            console.log(result);
            const user = result[0];
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(user));
        }
    });
};

module.exports= doctor;