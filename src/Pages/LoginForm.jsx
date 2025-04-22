import Login from "../Api/Login.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice.js';
const LoginForm = () => {
    const dispatch   = useDispatch()
  const [formData, setFormData] = useState({
    based: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
const navigate  = useNavigate()
  // Updated allFieldsValid to work without relying on errors state
  const allFieldsValid = () => {
    const isEmail = formData.based.includes("@");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/;

    const isBasedValid =
      formData.based.trim().length > 0 &&
      (isEmail ? emailRegex.test(formData.based) : usernameRegex.test(formData.based));

    const isPasswordValid = formData.password.length >= 6;

    return isBasedValid && isPasswordValid;
  };

  const validate = () => {
    const newErrors = {};
    const isEmail = formData.based.includes("@");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/;

    if (!formData.based.trim()) {
      newErrors.based = "Username or Email is required";
    } else if (isEmail && !emailRegex.test(formData.based)) {
      newErrors.based = "Invalid email format";
    } else if (!isEmail && !usernameRegex.test(formData.based)) {
      newErrors.based = "Username must not contain spaces";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error as the user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const result = await Login(formData);
        console.log("Login result", result);
        if(result.success){
            toast.success(result.message);
            dispatch(login({ user: result.user }));
            navigate("/home")
        }
      } catch (err) {
        console.error("Login error", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              name="based"
              value={formData.based}
              onChange={handleChange}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.based && (
              <p className="text-red-500 text-sm mt-1">{errors.based}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-xl mt-4 transition duration-200 ${
              allFieldsValid()
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-400 cursor-not-allowed text-white"
            }`}
            disabled={!allFieldsValid() || loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
