'use client'
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Banner from "@/public/images/hero.jpg";
import { getSession, signIn } from "next-auth/react"
import { useAppSelector, useAppDispatch } from "@/app/hook";
import { setUser } from "@/feature/user/userSlice";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();

  const onSubmit = async(event : FormEvent<HTMLFormElement>) => {
    
    event.preventDefault()

    
    const formData = new FormData(event.currentTarget)

    try {
        const response = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
          redirect: false,
        });
        
        if (!response?.ok) {
          throw Error((response?.error as string))
        }
        
        
       
        const session = await getSession()
        let data = null;
        if (session != null){
          data =  await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/getUser`,
            formData
          ).catch(function (error) {
            throw new Error(error.response.data.error)
          });
          
        }
        console.log(data)
        const dispatch = useAppDispatch();
        dispatch(setUser({ email: "", full_name: "", role: "" }));
        navigate.push("/");
        toast.success("Login successful");
      
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{
      backgroundImage: `url(${Banner.src})`,
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
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
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
                {errors.email.message  as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
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
                {errors.password.message  as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
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
              <p className="mt-1 text-sm text-red-600">{errors.role.message as string}</p>
            )}
          </div>

          <div>
            <Button className="w-full" variant="blue" placeholder={undefined} onClick={undefined}>
              Login
            </Button>
          </div>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-[#f08e80] font-semibold cursor-pointer"
              onClick={() => navigate.push("/signup")}
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
