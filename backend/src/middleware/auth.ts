import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "unauthorized token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY as string);
    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (e) {
    return res.status(401).json({ message: "unauthorized token" });
  }
};
