"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'; // Import usePathname
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLogin } from "../utils/fetchLogin";

const schema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = {
  username: string;
  password: string;
};

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const currentPath = usePathname(); // Get current pathname

  useEffect(() => {
    const token = getCookie('token');
    if (token && currentPath === "/login") { // Check if on the login page
      const role = getCookie("userRole");
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router, currentPath]); 

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await userLogin(data);
      console.log({result});
      if (result?.access_token) {
        setCookie("token", result.access_token, { maxAge: 60 * 60 * 24 });
        setCookie("userRole", result.role, { maxAge: 60 * 60 * 24 });
        setCookie('userId', result.userId);
        setSuccessMessage("Login successful!");
        const role = result.role;
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-indigo-950 flex flex-col items-center justify-center">
        <div className="mb-8">
          <Image src="/images/sawatok.png" alt="SawaTok Logo" width={500} height={400} />
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col items-center justify-center px-12 py-10">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Login</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 relative">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2 text-lg">
                Username
              </label>
              <div className="flex items-center border rounded-lg border-black">
                <span className="pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm0 2a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  {...register("username")}
                  type="text"
                  className={`w-full px-4 py-4 focus:outline-none text-lg ${errors.username ? "border-red-500" : "border-black"}`}
                  placeholder="Enter Username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 mt-2">{errors.username?.message}</p>
              )}
            </div>
            <div className="mb-8 relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-lg">
                Password
              </label>
              <div className="flex items-center border rounded-lg border-black">
                <span className="pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 4a2 2 0 00-2 2v1H7V6a3 3 0 016 0v1h-1V6a2 2 0 00-2-2z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4 9a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V9zm2 1v6h8v-6H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-4 pr-[40px] focus:outline-none text-lg ${errors.password ? "border-red-500" : "border-black"}`}
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-[10px] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye className="h-6 w-6 text-gray-500" /> : <FaEyeSlash className="h-6 w-6 text-gray-500" />}
                </span>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 mt-2">{errors.password?.message}</p>
              )}
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <button
              type="submit"
              className={`w-full px-4 py-4 mb-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-900 hover:bg-indigo-700"} text-white font-bold rounded-lg text-lg`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;



