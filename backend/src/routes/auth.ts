import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../modals/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is Required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        res.status(400).json({ message: "Invalid Credintialss" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECREAT_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
