"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/authSlice";
// import { LoginUser } from "@/apis/authApis";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  console.log(role);
  const router = useRouter();
  // const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required")
    }),

    // Dummy Login Start
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Simulated admin credentials
        if (
          values.email === "admin@gmail.com" &&
          values.password === "12345678"
        ) {
          // const fakeUser = {
          //   _id: "1234567890",
          //   name: "Admin User",
          //   email: "admin@gmail.com",
          //   role: "admin",
          //   is_verified: true,
          //   is_two_factor: false,
          //   is_active: true,
          //   phone: "0000000000",
          //   createdAt: new Date().toISOString(),
          //   updatedAt: new Date().toISOString(),
          //   accessToken: "dummyAccessToken123"
          // };

          toast.success("Login successful!");
          // dispatch(setUser(fakeUser));
          router.push("/");
        } else {
          toast.error("Unauthorized access. Admins only.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login.");
      } finally {
        setLoading(false);
      }
    }

    // Dummy Login End

    // onSubmit: async (values) => {
    //   setLoading(true);
    //   try {
    //     const res = await LoginUser(values);
    //     // Check if login was successful
    //     if (res?.accessToken && res?.user) {
    //       // Check if user is admin
    //       if (res.user.role === "admin") {
    //         toast.success("Login successful!");
    //         dispatch(
    //           setUser({
    //             ...res.user,
    //             accessToken: res.accessToken
    //           })
    //         );
    //         router.push("/");
    //       } else {
    //         toast.error("Unauthorized access. Admins only.");
    //       }
    //     } else {
    //       toast.error("Login failed. Incorrect email or password.");
    //     }
    //   } catch (error) {
    //     console.error("Login error:", error);
    //     toast.error("An error occurred during login. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  });

  return (
    <main className=" p-3 w-full md:px-4 min-h-screen   bg-[#6AC8C4] ">
      <div className="flex items-end justify-center w-full">
        <div className="flex items-center justify-center gap-2 pb-6">
          <div className="relative w-28 h-28">
            <Image
              src="/images/massy-image/logo.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-7/12 bg-[#F9F9F9] rounded-4xl px-2 sm:px-10 md:px-14 xl:px-20 py-14 ">
          <h1 className="text-[#794A3A] text-center font-dm-sans text-3xl font-semibold capitalize">
            Log in
          </h1>
          <p className="text-[#5B5B5B] text-center font-inter text-base font-light leading-normal py-6">
            Let’s Get to Know You!
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <div className="w-full pb-4 mt-3">
              <div className="flex items-center gap-2 rounded-lg border-[0.5px] border-[#AFAFAF] bg-[#FFF] px-6 h-14 ">
                <span className="text-xl text-gray-400">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.3219 14.5397C16.3219 15.3282 16.5459 15.6427 17.1319 15.6427C18.4378 15.6427 19.2694 13.9765 19.2694 11.2056C19.2694 6.97027 16.1869 4.94274 12.3384 4.94274C8.37938 4.94274 4.77844 7.60106 4.77844 12.6248C4.77844 17.4233 7.92844 20.0366 12.7659 20.0366C14.4084 20.0366 15.5109 19.8564 17.1975 19.2932L17.5594 20.8016C15.8944 21.3432 14.115 21.5 12.7434 21.5C6.39844 21.5 3 18.0081 3 12.6239C3 7.19462 6.93844 3.5 12.3609 3.5C18.0084 3.5 21 6.87922 21 11.0244C21 14.5388 19.8984 17.2196 16.4334 17.2196C14.8575 17.2196 13.8234 16.5889 13.6884 15.1912C13.2834 16.7456 12.2034 17.2196 10.74 17.2196C8.7825 17.2196 7.14 15.7093 7.14 12.669C7.14 9.60513 8.58094 7.71277 11.1684 7.71277C12.5409 7.71277 13.3959 8.25344 13.7766 9.10951L14.43 7.91552H16.32V14.5397H16.3219ZM13.5553 11.566C13.5553 10.3279 12.6319 9.80882 11.8669 9.80882C11.0344 9.80882 10.1128 10.4837 10.1128 12.4671C10.1128 14.0441 10.8103 14.9227 11.8669 14.9227C12.6094 14.9227 13.5553 14.4496 13.5553 13.143V11.566Z"
                      fill="#5B5B5B"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="min-w-full text-base bg-transparent h-14 rounded-e-lg focus:outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="w-full pb-2">
              <div className="flex items-center gap-2 relative rounded-lg border-[0.5px] border-[#AFAFAF] bg-white  px-6 h-14 mt-3">
                {/* Left Icon */}
                <span className="text-lg text-gray-400">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10.5V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10.5M12 15.5C12.2652 15.5 12.5196 15.3946 12.7071 15.2071C12.8946 15.0196 13 14.7652 13 14.5C13 14.2348 12.8946 13.9804 12.7071 13.7929C12.5196 13.6054 12.2652 13.5 12 13.5C11.7348 13.5 11.4804 13.6054 11.2929 13.7929C11.1054 13.9804 11 14.2348 11 14.5C11 14.7652 11.1054 15.0196 11.2929 15.2071C11.4804 15.3946 11.7348 15.5 12 15.5ZM12 15.5V18.5M6.6 10.5H17.4C18.28 10.5 19 11.22 19 12.1V19.1C19 20.42 17.92 21.5 16.6 21.5H7.4C6.08 21.5 5 20.42 5 19.1V12.1C5 11.22 5.72 10.5 6.6 10.5Z"
                      stroke="#5B5B5B"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                {/* Password Input */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full pr-10 text-base bg-transparent rounded-lg focus:outline-none"
                />

                {/* Right Icon (Eye) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:text-gray-700"
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {formik.touched.password && formik.errors.password && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`text-[#FFF] capitalize  text-base font-medium leading-normal tracking-[0.32px] flex items-center   justify-center     transition px-3 mt-3 py-4 rounded-xl ${
                loading
                  ? "bg-[#F6805C] cursor-not-allowed"
                  : "bg-[#F6805C] hover:bg-white hover:text-[#F6805C] border-1 border-[#F6805C] cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="w-5 h-5 capitalize border-2 border-white rounded-full animate-spin border-t-transparent" />
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
