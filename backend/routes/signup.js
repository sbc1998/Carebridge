const connection = require("../db/connection.js");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

// Load all environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

function signup(request, response) {
  const form = new formidable.IncomingForm();

  form.parse(request, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Form data parsing failed" }));
      return;
    }

    try {
      console.log("Fields:", fields);
      console.log("Files:", files);
      // Upload profile photo if exists
      let profileUrl = null;
      if (files.profile && files.profile[0].filepath) {
        const uploadResult = await cloudinary.uploader.upload(files.profile[0].filepath);
        profileUrl = uploadResult.secure_url;
      }

      const parsedData = {
        nic: fields.nic[0],
        firstName: fields.firstName[0],
        lastName: fields.lastName[0],
        gender: fields.gender[0],
        email: fields.email[0],
        phone: fields.phone[0],
        address: fields.address[0],
        role: fields.role[0],
        experience: fields.experience ? fields.experience[0] : null,
        specialization: fields.specialization ? fields.specialization[0] : null,
        license: fields.license ? fields.license[0] : null,
        password: fields.password[0],
        profile: profileUrl,
      };

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
        parsedData.role === "Doctor" ? Number(parsedData.experience) : null,
        parsedData.role === "Doctor" ? parsedData.specialization : null,
        (parsedData.role === "Doctor" || parsedData.role === "Pharmacist")
          ? parsedData.license
          : null,
        parsedData.password,
      ];

      const checkQuery = "SELECT USER_ID, EMAIL FROM USER WHERE USER_ID=? OR EMAIL=?";
      connection.query(checkQuery, [parsedData.nic, parsedData.email], (error, result) => {
        if (error) {
          console.error("Database query error:", error);
          response.writeHead(500, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Database error" }));
          return;
        }

        const errors = {};
        const emailExists = result.some(user => user.EMAIL === parsedData.email);
        const nicExists = result.some(user => user.USER_ID === Number(parsedData.nic));

        if (nicExists || emailExists) {
          if (nicExists) errors.nic = "NIC already exists";
          if (emailExists) errors.email = "Email already exists";
          response.writeHead(409, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ errors }));
          return;
        }

        const insertQuery = `
          INSERT INTO USER (
            USER_ID, FIRST_NAME, LAST_NAME, GENDER, EMAIL, PHONE_NUMBER,
            ADDRESS, PROFILE_URL, ROLE, EXPERIENCE, SPECIALIZATION, LICENSE, PASSWORD
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(insertQuery, values, (error, result) => {
          if (error) {
            console.error("Insert error:", error);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Database error" }));
          } else {
            console.log("User inserted:", result);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Signup successful!" }));
          }
        });
      });
    } catch (error) {
      console.error("Error processing form:", error);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Internal server error" }));
    }
  });
}

module.exports = signup;
