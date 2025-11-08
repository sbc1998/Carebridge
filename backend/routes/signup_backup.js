const connection = require("../db/connection.js");

function signup(request, response) {
  let data = "";

  request.on("data", (chunk) => {
    data += chunk.toString();
  });

  request.on("end", () => {
    const parsedData = JSON.parse(data);
    console.log("Parsed data:", parsedData); //type of parsed data: object

    const values = [
      parsedData.nic,
      parsedData.firstName,
      parsedData.lastName,
      parsedData.gender,
      parsedData.email,
      parsedData.phone,
      parsedData.address,
      parsedData.profile,
      parsedData.role,
      parsedData.role=== 'Doctor'? Number(parsedData.experience): null,
      parsedData.role=== 'Doctor'? parsedData.specialization: null,
      (parsedData.role=== 'Doctor' || parsedData.role=== 'Pharmacist')? parsedData.license: null,
      parsedData.password
      
    ];

    console.log("Insert values:", values);

    //first check if user already exists (b y email or nic)
    const checkQuery =
      "Select USER_ID, EMAIL FROM USER WHERE USER_ID=? OR EMAIL=?";
    connection.query(
      checkQuery,
      [parsedData.nic, parsedData.email],
      function (error, result) {
        if (error) {
          console.error("Database query error:", error);
          response.writeHead(500, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Database error" }));
          return;
        }
        else if (result.length > 0) {
          const errors= {};
          let emailExists = result.some(
            (user) => user.EMAIL === parsedData.email
          );
          let nicExists = result.some(
            (user) => user.USER_ID === Number(parsedData.nic)
          );

          if (nicExists && emailExists) {
            errors.nic= 'NIC already exists';
            errors.email= 'Email already exists';
            response.writeHead(409, { "Content-Type": "application/json" });
            response.end(JSON.stringify({errors}));
            return;
          } else if (emailExists) {
            errors.email= 'Email already exists';
            response.writeHead(409, { "Content-Type": "application/json" });
            response.end(JSON.stringify({errors}));
            return;
          } else if (nicExists) {
            errors.nic= 'NIC already exists';
            response.writeHead(409, { "Content-Type": "application/json" });
            response.end(JSON.stringify({errors}));
            return;
          }
        } else {
          const insertQuery =
            "INSERT INTO USER (USER_ID, FIRST_NAME, LAST_NAME, GENDER, EMAIL, PHONE_NUMBER, ADDRESS, PROFILE, ROLE, EXPERIENCE, SPECIALIZATION, LICENSE, PASSWORD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

          connection.query(insertQuery, values, function (error, result) {
            if (error) {
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: "Database error" }));
              return;
            } else {
              console.log("Data inserted successfully:", result);
              response.writeHead(200, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ 
                message: "Signup successful!"
              }));
            }
          });
        }
      }
    );
  });
}

module.exports = signup;
