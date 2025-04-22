import signup from "../Api/Signup.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Only letters, numbers & underscores allowed";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const allFieldsValid = () => {
    return (
      formData.username.trim() &&
      /^[a-zA-Z0-9_]+$/.test(formData.username) &&
      formData.name.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 6
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await signup(formData);
      if (data.success) {
        toast.success(data.message || "Signup successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("Signup failed. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="@username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
              <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24">
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
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignupForm;
