import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTitle } from "../../hooks/useTitle";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GoogleLogin from "../../components/Social/GoogleLogin";

const Register = () => {
  useTitle("Register | Yoga Master - Unleashed Your Inner Self");
  const { signUp, error, setError, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setError("");

    // Set photoUrl to the default image
    const userPhotoUrl = "/User.png"; // Path to the default image

    toast.promise(
      signUp(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            return updateUser(data.name, userPhotoUrl).then(() => {
              const userImp = {
                name: user.displayName,
                email: user.email,
                photoUrl: userPhotoUrl,
                gender: data.gender,
                address: data.address,
                role: "user",
                phone: data.phone,
              };

              if (user.email && user.displayName) {
                return axios
                  .post("http://localhost:5000/new-user", userImp)
                  .then(() => {
                    navigate("/");
                    return "Registration successful!";
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }
            });
          }
        })
        .catch((err) => {
          setError(err.code);
          throw new Error(err);
        }),
      {
        pending: "Please wait...",
        success: "Registration successful!",
        error: "Registration failed!",
      }
    );
  };

  const password = watch("password", "");

  return (
    <div className="flex items-center justify-center bg-gray-100 pt-14">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center">Please Register</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineUser className="inline-block mb-1 mr-2 text-lg" />
                Name
              </label>
              <input
                placeholder="Enter your name"
                type="text"
                {...register("name", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineMail className="inline-block mb-1 mr-2 text-lg" />
                Email
              </label>
              <input
                placeholder="Enter your email"
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineLock className="inline-block mb-1 mr-2 text-lg" />
                Password
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineLock className="inline-block mb-1 mr-2 text-lg" />
                Confirm Password
              </label>
              <input
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.confirmPassword && (
                <div className="w-full mt-1 text-sm text-red-500">
                  <p>{errors.confirmPassword.message}</p>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlinePhone className="inline-block mb-1 mr-2 text-lg" />
                Phone Number
              </label>
              <input
                placeholder="Phone Number"
                type="tel"
                {...register("phone", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block mb-2 font-bold text-gray-700"
              >
                <AiOutlineUser className="inline-block mb-1 mr-2 text-lg" />
                Gender
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 font-bold text-gray-700"
            >
              <HiOutlineLocationMarker className="inline-block mb-1 mr-2 text-lg" />
              Address
            </label>
            <textarea
              {...register("address", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
              rows="3"
              placeholder="Enter your address"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-secondary hover:bg-red-500"
            >
              Register
            </button>
            {errors.password && (
              <div className="w-full mt-1 text-sm text-red-500">
                <p>
                  Password must be at least 6 characters long, contain a <br />{" "}
                  capital letter, and a special character.
                </p>
              </div>
            )}
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-secondary">
            Login
          </Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
