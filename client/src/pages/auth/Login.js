import React from "react";
import Layout from "../../components/Layouts/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [id, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post(`api/v1/auth/login`, { id, password });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || '/');

      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error occurred..");
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Layout title={"Login-Vlabs"}>
      <div>For Admin : RollNo:admin Password:123</div>
      <div>For Student : RollNo:21052804 Password:123</div>
        <div className="container-box">
         
          <form onSubmit={handleSubmit} className="form-box form-box-login">
            <div className="mb-3">
              <label for="exampleInputRoll" className="form-label">
                Roll Number
              </label>
              <input
                type="text"
                onChange={(e) => setRollno(e.target.value)}
                class="form-control"
                id="exampleInputRoll"
                placeholder="Enter your roll Number"
                value={id}
                required
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                placeholder="Enter password"
                value={password}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
