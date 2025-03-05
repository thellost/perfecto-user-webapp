import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Banner from "../../assets/images/hero.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);
    formData.append("scope", data.role);
    console.log(process.env.REACT_APP_API_URL);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/token`,
        formData
      );
      if (response.status === 200) {
        document.cookie = `access_token=${response.data.access_token}`;
        document.cookie = `token_type=${response.data.token_type}`;
        navigate("/");
        toast.success("Login successful");
      }
    } catch (error) {
      console.log(error);
      console.log(
        error.response?.data?.detail || "Something went wrong, try again"
      );
      toast.error(
        error.response?.data?.detail || "Something went wrong, try again"
      );
    }
  };

  const imageUrl = "https://via.placeholder.com/150";

  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: `url(${Banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              <option value="agent">Agent</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Button className="w-full" variant="blue">
              Login
            </Button>
          </div>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-[#f08e80] font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
