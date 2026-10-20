import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
const handleSubmit = async (e)=>{
 e.preventDefault();
   const user=await login(formData);
   
   localStorage.setItem('user', JSON.stringify({
      name: user.name,     // username
      email:user.email,
      id: user.id
    }));
    navigate("/dashboard");

}

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
            T
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Task Manager
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organize your work and boost productivity
          </p>
        </div>

        <form className="space-y-4"  onSubmit={handleSubmit}>
          <input
           id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
          />

          <div className="relative">
            <input
             id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-slate-900"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-slate-900 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button onClick={handleSubmit}
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <span onClick={()=>navigate("/signup")} className="cursor-pointer font-semibold text-slate-900">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};