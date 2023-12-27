import jwt from "jsonwebtoken";

/**
 * Middleware function to authenticate token
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
export const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.header("Authorization");

  // Split the header to get the token
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token dari header

  // If token is not present, return access denied
  if (!token) return res.status(401).json({ message: "Access denied" });

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    // If token is invalid, return invalid token
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Set the user property in the request object
    req.user = user;

    // Call the next middleware function
    next();
  });
};
