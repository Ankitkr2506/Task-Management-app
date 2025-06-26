import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("https://task-management-app-nine-ashen.vercel.app/api/v1/sign-in", Data);

      console.log("Signup success:", response.data);
      setData({ username: "", email: "", password: "" });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-gray-400 h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold text-center mb-4 text-white">Signup</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="email"
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between mt-4">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            Signup
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:text-blue-400 ml-1">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
