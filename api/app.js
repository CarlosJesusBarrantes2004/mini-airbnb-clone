import express, { json } from "express";
import cors from "cors";
import connectDB from "./db.js";
import errorHandler from "./middlewares/errorhandler.js";
import cookieParser from "cookie-parser";
import path from "path";
import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import placeRouter from "./routes/place.routes.js";
import bookingRouter from "./routes/booking.routes.js";

await connectDB();

const app = express();

const __dirname = path.resolve();
const uploadsFolderPath = path.join(__dirname, "uploads");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadsFolderPath));

app.use("/api", authRouter);
app.use("/api", uploadRouter);
app.use("/api", placeRouter);
app.use("/api", bookingRouter);

// Not Found
app.use((req, res, next) =>
  res.status(404).json({ message: "Endpoint not found" })
);

// Error Handler
app.use(errorHandler);

export default app;
