import { useState } from "react";

import API from "../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/signup",
        formData
      );

      alert("Signup successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Signup
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:border-green-500"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:border-green-500"
          onChange={handleChange}
        />

        {/* Password */}
        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg outline-none focus:border-green-500"
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>

        </div>

        <select
          name="role"
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:border-green-500"
          onChange={handleChange}
        >
          <option value="Member">
            Member
          </option>

          <option value="Admin">
            Admin
          </option>

        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Signup
        </button>

        <p className="text-center mt-5 text-gray-600">

          Already have an account?

          <Link
            to="/"
            className="text-green-600 font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Signup;