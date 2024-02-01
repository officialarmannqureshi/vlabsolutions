import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routers/authRoute.js";

// configure env
dotenv.config();

// databse config
connectDB();

// rest object
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", (req, res) => { res.send(`<h1>Welcome to the Auth Server</h1>`); })
// routes
app.use("/api/v1/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
                  .bgCyan.white);
});
