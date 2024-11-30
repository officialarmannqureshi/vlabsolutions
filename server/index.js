import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routers/authRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
// app.use(cors());
// app.use(cors({
//   // origin: "https://vlabsolutions-frontend.vercel.app",
//   origin: "*",
//   methods: ["GET", "POST", "PUT"],
// }));


// added for deployment

// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from your client
//   credentials: true,
  
// }));

app.use(cors({
  origin: "https://vlabsolutions-frontend.vercel.app", // Allow requests from your client
  credentials: true,
  
}));
app.options('*', cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/", (req, res) => {
  res.send(`<h1>Welcome to the Auth Server #2</h1>`);
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
