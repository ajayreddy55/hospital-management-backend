const jwt = require("jsonwebtoken");

const jwtAuth = (request, response, next) => {
  let jwtToken;

  const authHeaders = request.headers["authorization"];

  if (authHeaders !== undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }

  if (authHeaders === undefined) {
    return response.status(401).json({ message: "JWT Token is not provided" });
  } else {
    jwt.verify(jwtToken, "HOSPITAL_LOGIN", (error, payload) => {
      if (error) {
        return response.status(401).json({ message: "Invalid JWT Token" });
      } else {
        request.userId = payload.id;
        next();
      }
    });
  }
};

module.exports = jwtAuth;
