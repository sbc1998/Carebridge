const connection = require("../db/connection.js");

function login(request, response) {
  let data = "";

  request.on("data", chunk => { data += chunk.toString(); });

  request.on("end", () => {
    const parsedData = JSON.parse(data);
    const values = [parsedData.nic, parsedData.password];
    const sql = "SELECT USER_ID, ROLE FROM USER WHERE USER_ID = ? AND PASSWORD = ?";

    connection.query(sql, values, (err, result) => {
      console.log("Query Result:", result);
      if(result.length>0) {
        
        const user_id= result[0].USER_ID;
        const role= result[0].ROLE;
        
        console.log("Login Successful");
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({
          message: 'Login Successful!',
          user_id: user_id,
          role: role,
        }));
      }
      else {
        console.log("Login Failed");
        response.writeHead(401, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ error: "Wrong NIC Number/Password" }));
      }
    });
  });
}

module.exports = login;
