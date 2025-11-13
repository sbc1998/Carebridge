const http= require("http"); 
const url= require("url");
const setCorsHeaders= require('./utils/cors.js');
const signup= require("./routes/signup.js");
const login= require("./routes/login.js");
const doctor= require("./routes/doctor.js");
const updateDoctorProfile= require("./controller/doctor.js");
const createAppointment= require("./controller/doctor/createAppointment.js");
const updateAppointment= require("./controller/doctor/updateAppointment.js");
const getAppointment= require("./controller/doctor/getAppointment.js");
const deleteAppointment= require("./controller/doctor/deleteAppointment.js");
const calculateAppointmentsCount= require("./controller/doctor/calculateAppointmentsCount.js");

// function sendResponse(request, response) {

//   setCorsHeaders(response);

//   if (request.method === "OPTIONS") {
//     response.writeHead(204); // No content
//     response.end();
//     return;
//   }

//   //for signup
//   if (request.method === "POST" && request.url === "/signup") {
//     signup(request, response);
//   } 

//   //for login
//   if (request.method=== "POST" && request.url=== "/login") {
//     login(request, response);  
//   }

//   // for doctor
//   const parsedUrl= url.parse(request.url, true);
//     // console.log("Parsed url:", parsedUrl);
//     const pathParts= parsedUrl.pathname.split('/');
//     let user_id= pathParts[2];
//   if (request.method=== "GET" && pathParts[1]=== "doctor" && user_id) {
//     doctor(request, response, user_id);
//   }
//   //to create appointment
//   user_id= pathParts[3];
//   if (request.method === "POST" && pathParts[2] === "createAppointment" && user_id){
//     createAppointment(request, response, user_id);
//   } 
//   //to update appointment
//   if (request.method === "PUT" && pathParts[2] === "updateAppointment" && user_id){
//     updateAppointment(request, response, user_id);
//   } 

//   //to delete appointment
//   let appointment_id= pathParts[2];
//   if (request.method === "DELETE" && pathParts[1] === "deleteAppointment" && appointment_id){
//     deleteAppointment(request, response, appointment_id);
//   } 

//   // to get total number of appointments
//   user_id= pathParts[2];
//   if (request.method === "GET" && pathParts[3] === "appointments" && pathParts[4] === "counts" && user_id){
//     calculateAppointmentsCount(request, response, user_id);
//   } 
//   //to get list of appointments for doctor
//   user_id= pathParts[2];
//   if (request.method === "GET" && pathParts[1] === "appointment" && user_id){
//     console.log("getapp");
//     getAppointment(request, response, user_id);
//   } 
//   user_id= pathParts[3];
//   if (request.method=== "POST" && pathParts[2]=== "update" && user_id) {
//     updateDoctorProfile(request, response, user_id);
//   }

 
  
// }

function sendResponse(request, response) {
  setCorsHeaders(response);
  
  if (request.method === "OPTIONS") {
    response.writeHead(204); // No content
    response.end();
    return;
  }

  //for signup
  if (request.method === "POST" && request.url === "/signup") {
    signup(request, response);
    return;
  } 

  //for login
  if (request.method === "POST" && request.url === "/login") {
    login(request, response);  
    return;
  }

  // for doctor
  const parsedUrl = url.parse(request.url, true);
  const pathParts = parsedUrl.pathname.split('/');
  console.log("URL:", pathParts);
  let user_id = pathParts[2];
  if (request.method === "GET" && pathParts[1] === "doctor" && user_id && pathParts.length===3) {
    doctor(request, response, user_id);
    return;
  }

  //to create appointment
  user_id = pathParts[3];
  if (request.method === "POST" && pathParts[2] === "createAppointment" && user_id) {
    createAppointment(request, response, user_id);
    return;
  } 

  //to update appointment
  if (request.method === "PUT" && pathParts[2] === "updateAppointment" && user_id) {
    updateAppointment(request, response, user_id);
    return;
  } 

  //to delete appointment
  let appointment_id = pathParts[2];
  if (request.method === "DELETE" && pathParts[1] === "deleteAppointment" && appointment_id) {
    deleteAppointment(request, response, appointment_id);
    return;
  } 

  // to get total number of appointments
  user_id = pathParts[2];
  if (request.method === "GET" && pathParts[3] === "appointments" && pathParts[4] === "counts" && user_id) {
    calculateAppointmentsCount(request, response, user_id);
    return;
  } 

  //to get list of appointments for doctor
  user_id = pathParts[2];
  if (request.method === "GET" && pathParts[1] === "appointment" && user_id) {
    getAppointment(request, response, user_id);
    return;
  } 

  user_id = pathParts[3];
  if (request.method === "POST" && pathParts[2] === "update" && user_id) {
    updateDoctorProfile(request, response, user_id);
    return;
  }
}


const server = http.createServer(sendResponse);
server.listen(4000, () => {
  console.log("Server started on port 4000");
});