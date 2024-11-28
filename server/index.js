import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routers/authRoute.js";
import cors from "cors";
import createProxyMiddleware from "http-proxy-middleware";


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT"], 
// }));
app.use(cors());

//added for deployment
app.use(cors({
  origin: '*'  //to be changed later to vercel url
}));

app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/",(req,res)=>{
  res.send(`<h1>Welcome to the Auth Server</h1>`);
})


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
