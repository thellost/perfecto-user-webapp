'use client'
import React, { FormEvent, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useRouter, useSearchParams} from "next/navigation";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Banner from "@/public/images/hero.jpg";

const SignUpComponent = () =>{
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const navigate = useRouter();
  const referralCode = useSearchParams().get("referral_code") ?? undefined;
  console.log(referralCode)
  const onSubmit = async(event : FormEvent<HTMLFormElement>) => {
      
    event.preventDefault()
    const payload = new FormData(event.currentTarget)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/createUser`,
        payload
      ).catch(function (error) {
        throw new Error(error.response.data.error)
      });

      if (response?.status === 200) {
        navigate.push("/login");
        toast.success("User registered successfully, Please login to continue");
      } 
    } catch (error) {
      toast.error( (error as Error).message)
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
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={onSubmit} className="space-y-4">

          <div className="flex space-x-2 mt-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message as string}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
            required
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Controller
            
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="US"
                  {...field}
                  required
                  id="phone"
                  className="w-full px-3 py-2 border rounded-md"
                />
              )}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Referral Code
            </label>
            <input
              type="text"
              id="referral"
              {...register("referral")}
              defaultValue={referralCode ? referralCode : ""}
              disabled={referralCode ? true : false}
              className={`w-full px-3 py-2 border ${referralCode ? `bg-gray-100` : ``} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              required
              {...register("role", { required: "Role is required" })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select role</option>
              <option value="agent">Agent</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message as string}</p>
            )}
          </div>

          <div>
            <Button className="w-full" variant="blue" placeholder={undefined} onClick={undefined} >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignUp = () => {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SignUpComponent />
    </Suspense>
  )
}
export default SignUp;
