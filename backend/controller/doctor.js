const connection = require("../db/connection.js");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const util = require("util");

// Load all environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Promisify the query function
const query = util.promisify(connection.query).bind(connection);

async function updateProfile(request, response, user_id) {
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

      const flatFields = {};
      for (const key in fields) {
        if (Array.isArray(fields[key])) {
            flatFields[key] = fields[key][0]; // take the first item
        } else {
            flatFields[key] = fields[key];
        }
      }  
      if(Object.keys(flatFields).length > 0) {
        const setClause = Object.keys(flatFields).map(key => `${key} = ?`).join(', '); 
        const sql = `UPDATE USER SET ${setClause} WHERE USER_ID = ?`;
        const values = Object.values(flatFields);
        values.push(user_id);
        await query(sql, values);
        console.log('Update successful');
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Update successful" }));
      }  

      let profileUrl;
      if (files && files.PROFILE_URL && files.PROFILE_URL[0].filepath) {
        const sql = 'SELECT PROFILE_URL FROM USER WHERE USER_ID = ?';
        const results = await query(sql, [user_id]);

        const existingProfileUrl = results[0]?.PROFILE_URL || null;
        const oldPublicId = extractPublicIdFromUrl(existingProfileUrl);

        const uploadResult = await cloudinary.uploader.upload(files.PROFILE_URL[0].filepath, {
          public_id: oldPublicId,
          overwrite: true,
          invalidate: true,
        });

        profileUrl = uploadResult.secure_url;

        const updateSql = 'UPDATE USER SET PROFILE_URL = ? WHERE USER_ID = ?';
        await query(updateSql, [profileUrl, user_id]);

        console.log('Profile URL updated successfully');
      } else {
        console.log('Image update failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Internal server error" }));
    }
  });
}

function extractPublicIdFromUrl(url) {
  if (!url) return null;

  // Example Cloudinary URL: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/image-name.jpg
  const parts = url.split('/');
  const fileName = parts[parts.length - 1]; // image-name.jpg
  const publicIdWithExtension = fileName.split('.')[0]; // image-name

  // If your images are stored in folders, include folder path
  const folderIndex = parts.indexOf('upload') + 1;
  const folderPath = parts.slice(folderIndex, parts.length - 1).join('/');

  return folderPath ? `${folderPath}/${publicIdWithExtension}` : publicIdWithExtension;
}


module.exports = updateProfile;

