import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import router from "./routes/index";
import { FRONTEND_URL } from "./config";

await connectDB();

const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use(router);

// Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not Found" });
});

// Error Handler
app.use(errorMiddleware);

export default app;
