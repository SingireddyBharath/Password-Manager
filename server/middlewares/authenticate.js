const jwt = require("jsonwebtoken");
const User = require("../models/schema");
const { decrypt } = require("../models/EncDecManager");

// Middleware to authenticate users via JSON Web Tokens (JWT).
const authenticate = async (req, res, next) => {
  try {
    // Extract the JWT from cookies.
    const token = req.cookies.jwtoken;

    // Verify the token with the secret key.
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user in the database by their ID and token.
    var rootUser = await User.findOne({
      _id: verify._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      // If no user is found, raise an error.
      throw new Error("User not found");
    }

    // Attach authenticated user's properties to the request object.
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    // Proceed to the next middleware or route handler.
    next();
  } catch (error) {
    // Send a 400 response for unauthenticated requests and log the error.
    res.status(400).json({ error: "Unauthorised user." });
    console.log(error);
  }
};

module.exports = authenticate;
