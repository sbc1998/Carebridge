
function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*"); 
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports= setCorsHeaders;

