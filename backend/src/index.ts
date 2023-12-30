import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("db conected ");
  })
  .catch((e) => {
    console.log("err");
  });

const app = express();
app.use(cookieParser());
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
  res.send({ message: " hello " });
});

app.listen(port, () => {
  console.log("app is up on " + port);
});
