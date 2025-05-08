import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import moderatorRoute from "./routes/moderator.route.js";
import homeRoute from "./routes/home.route.js";
import manageRoutes from "./routes/manage.route.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5100",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"]
}));
app.use("/api/auth", authRoute);
app.use("/api/moderators", moderatorRoute);
app.use("/api/home", homeRoute);
app.use("/api/manage", manageRoutes);

app.listen(8000, () => {
  connect();
  console.log("Backend running on port 8000");
});
