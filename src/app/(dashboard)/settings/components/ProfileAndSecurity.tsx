"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiPencil } from "react-icons/bi";

const ProfileAndSecurity = () => {
  // Hardcoded user data
  const [profile] = useState({
    name: "Ahmed",
    role: "Youth",
    email: "Admin@Example.Com",
    avatar: "/images/provider-profile.png"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nameInput, setNameInput] = useState(profile.name);

  useEffect(() => {
    if (selectedFile) {
      // File selected, you can handle upload here in the future
      // For now, just referencing it to avoid linter error
    }
  }, [selectedFile]);

  // Security form state
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const securityFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Required")
    }),
    onSubmit: (values, { resetForm }) => {
      alert("Password updated!");
      resetForm();
    }
  });

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <section>
        <h3 className="font-semibold text-[#794A3A] mb-4">Profile</h3>
        <div className="p-3 px-6 bg-[#F9F9F9] rounded-xl ">
          <div className="">
            <div className="flex gap-5 items-center">
              <div className="flex relative flex-col items-center mb-4">
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="object-cover w-24 h-24 rounded-full"
                />
                <button
                  type="button"
                  className="flex absolute border border-[#AFAFAF] bottom-0 left-1/2 justify-center items-center p-0.5 bg-white rounded-sm -translate-x-1/2 translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profile-upload-input")?.click()
                  }
                >
                  <Image
                    src="/images/profileUploadIcon.png"
                    alt="Upload"
                    width={20}
                    height={20}
                  />
                </button>
                <input
                  id="profile-upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <div>
                <div className="text-lg uppercase font-semibold text-[#222]">
                  {profile.name}
                </div>
                <div className="text-sm">{profile.role}</div>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 pt-8 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2 text-[#5B5B5B]">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full text-sm px-4 py-4 rounded-lg border border-[#AFAFAF] bg-white text-[#656565] focus:outline-none focus:ring-2 focus:ring-[#F6805C] pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#000000]"
                    tabIndex={-1}
                  >
                    <BiPencil size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2 text-[#5B5B5B]">
                  Email Address
                </label>
                <input
                  type="text"
                  value={profile.email}
                  disabled
                  className="w-full text-sm px-4 py-4 rounded-lg border border-[#AFAFAF] bg-[#D7D7D7] text-[#888] cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-[#333] mb-4">Security</h3>

        <form
          onSubmit={securityFormik.handleSubmit}
          className="p-3 px-6 bg-[#F9F9F9] rounded-xl shadow"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-[15px] font-medium mb-2 text-[#333]">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Enter"
                  value={securityFormik.values.oldPassword}
                  onChange={securityFormik.handleChange}
                  onBlur={securityFormik.handleBlur}
                  className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F6805C]"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
                  onClick={() => setShowOld((v) => !v)}
                  tabIndex={-1}
                >
                  {showOld ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {securityFormik.touched.oldPassword &&
                securityFormik.errors.oldPassword && (
                  <div className="mt-1 text-xs text-red-500">
                    {securityFormik.errors.oldPassword}
                  </div>
                )}
            </div>
            <div className="flex flex-col">
              <label className="text-[15px] font-medium mb-2 text-[#333]">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter"
                  value={securityFormik.values.newPassword}
                  onChange={securityFormik.handleChange}
                  onBlur={securityFormik.handleBlur}
                  className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F6805C]"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
                  onClick={() => setShowNew((v) => !v)}
                  tabIndex={-1}
                >
                  {showNew ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {securityFormik.touched.newPassword &&
                securityFormik.errors.newPassword && (
                  <div className="mt-1 text-xs text-red-500">
                    {securityFormik.errors.newPassword}
                  </div>
                )}
            </div>
            <div className="flex flex-col">
              <label className="text-[15px] font-medium mb-2 text-[#333]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter"
                  value={securityFormik.values.confirmPassword}
                  onChange={securityFormik.handleChange}
                  onBlur={securityFormik.handleBlur}
                  className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F6805C]"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {securityFormik.touched.confirmPassword &&
                securityFormik.errors.confirmPassword && (
                  <div className="mt-1 text-xs text-red-500">
                    {securityFormik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-8">
            <button
              type="button"
              className="px-8 py-2 rounded-lg border border-[#F6805C] text-[#F6805C] font-semibold bg-white hover:bg-[#FFF3F0] transition"
              onClick={() => securityFormik.resetForm()}
            >
              Update
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-[#F6805C] text-white font-semibold hover:bg-[#e96a4a] transition"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileAndSecurity;
