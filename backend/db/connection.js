const mysql = require("mysql2");
const dotenv= require("dotenv"); 

// load .env variables
dotenv.config();

//sql connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.log("error connecting to mysql");
  } else {
    console.log("connected to sql");
  }
});

module.exports= connection;

