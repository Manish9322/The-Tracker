import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));



app.use("/api/user",UserRoutes);

app.use((err,req,res,next) =>{
  const status = err.status || 500;
  const message  = err.message || "Facing problem, There might be something wrong.";
  return res.status(status).json({
    success:false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello everyone !! my name is Manish.",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Failed to connect to MongoDB");
      console.log(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server running on port 8080"));
  } catch (err) {
    console.log(err);
  }
};


startServer();
