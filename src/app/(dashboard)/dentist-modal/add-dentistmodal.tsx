"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  whatsapp: Yup.string().required("WhatsApp number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  service: Yup.string().required("Service is required"),
  fee: Yup.string().required("Fee is required")
});

export default function AddDentistModal() {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      whatsapp: "",
      email: "",
      address: "",
      service: "",
      fee: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      setOpen(false);
    }
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#229EDA] text-white rounded-3xl sm:rounded-lg px-3 py-3 border border-[#229EDA] hover:bg-white hover:text-[#229EDA] transition"
      >
        + Add New Dentist
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-6 space-y-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-center">
              Add New Dentist
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Image Upload Area */}
              <div className="flex flex-col items-center justify-center p-6 text-gray-500 border-2 border-dashed rounded-md">
                <FaCloudUploadAlt size={24} className="mb-2" />
                <span className="text-sm">Upload Image</span>
              </div>

              {/* Name and WhatsApp */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="w-full p-2 border rounded bg-gray-50"
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium"
                  >
                    WhatsApp Number
                  </label>
                  <div className="flex">
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      className="w-full p-2 border rounded-l rounded-r-none bg-gray-50"
                      placeholder="Enter WhatsApp Number"
                      onChange={formik.handleChange}
                      value={formik.values.whatsapp}
                    />
                    <button
                      type="button"
                      className="bg-[#229EDA] text-white px-3 rounded-r hover:bg-[#1b8bc2]"
                    >
                      +
                    </button>
                  </div>
                  {formik.touched.whatsapp && formik.errors.whatsapp && (
                    <p className="text-sm text-red-500">
                      {formik.errors.whatsapp}
                    </p>
                  )}
                </div>
              </div>

              {/* Email and Address */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-2 border rounded bg-gray-50"
                    placeholder="Enter Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    className="w-full p-2 border rounded bg-gray-50"
                    placeholder="Enter Address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-sm text-red-500">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium">
                  Service
                </label>
                <input
                  id="service"
                  name="service"
                  className="w-full p-2 border rounded bg-gray-50"
                  placeholder="Enter Service"
                  onChange={formik.handleChange}
                  value={formik.values.service}
                />
                {formik.touched.service && formik.errors.service && (
                  <p className="text-sm text-red-500">
                    {formik.errors.service}
                  </p>
                )}
              </div>

              {/* Fee */}
              <div>
                <label htmlFor="fee" className="block text-sm font-medium">
                  Fee
                </label>
                <input
                  id="fee"
                  name="fee"
                  className="w-full p-2 border rounded bg-gray-50"
                  placeholder="Enter Fee"
                  onChange={formik.handleChange}
                  value={formik.values.fee}
                />
                {formik.touched.fee && formik.errors.fee && (
                  <p className="text-sm text-red-500">{formik.errors.fee}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#229EDA] text-white rounded hover:bg-[#1b8bc2]"
                >
                  Add New Dentist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
