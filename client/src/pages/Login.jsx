import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import API from "../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      setUser(data);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:border-blue-500"
          onChange={handleChange}
        />

        {/* Password */}
        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-5 text-gray-600">

          Don’t have an account?

          <Link
            to="/signup"
            className="text-blue-600 font-semibold ml-1"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;