import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        currentUser?: any;
    }
}

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not defined" });
  }

  try {
    // Verify token using JWT_SECRET
    const decode = jwt.verify(token, process.env.JWT_SECRET as Secret);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Store decoded token in request object
    req.currentUser = decode;
    next();
  } catch (error) {
    // Handle JWT verification errors
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
