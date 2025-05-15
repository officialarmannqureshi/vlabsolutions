import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/auth.css";
import "./styles/login.css";
import "./styles/admin.css";
import "./styles/user.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SpeedInsights } from "@vercel/speed-insights/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
     
      <App />
  </SpeedInsights>
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
