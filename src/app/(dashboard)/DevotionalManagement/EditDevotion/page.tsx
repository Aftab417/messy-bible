"use client";

import type React from "react";
import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Validation schema
const humanbrailSchema = Yup.object().shape({
  devoti: Yup.string().required("Devoti title is required"),
  tagline: Yup.string().required("Tagline is required"),
  devotional: Yup.string().required("Devotional text is required"),
  scriptureReference: Yup.string().required("Scripture reference is required"),
  status: Yup.string().required("Status is required"),
  image: Yup.mixed().required("Image is required")
});

const HumanbrailUpload = () => {
  const [formData, setFormData] = useState({
    devoti: "",
    tagline: "",
    devotional: "",
    scriptureReference: "",
    status: "Active",
    image: null as File | null
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Scripture reference options
  const scriptureReferences = [
    "Ephesians 4:14-16",
    "James 12:24",
    "Joq 5:8",
    "Genesis 1:1",
    "John 3:16",
    "Psalm 23"
  ];

  // Status options
  const statusOptions = ["Active", "Inactive", "Draft"];

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear validation error for image
      if (validationErrors.image) {
        setValidationErrors((prev) => ({
          ...prev,
          image: ""
        }));
      }
    }
  };

  // Validate form
  const validateForm = async () => {
    try {
      await humanbrailSchema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setValidationErrors(errors);

        // Show first error as toast
        const firstError = error.inner[0]?.message;
        if (firstError) {
          toast.error(firstError);
        }
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("devoti", formData.devoti);
      formDataToSend.append("tagline", formData.tagline);
      formDataToSend.append("devotional", formData.devotional);
      formDataToSend.append("scriptureReference", formData.scriptureReference);
      formDataToSend.append("status", formData.status);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call API to submit form
      console.log("Submitting form data:", formData);

      // Show success SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Upload Successful!",
        text: "Your Humanbrail content has been uploaded successfully.",
        confirmButtonColor: "#F6805C"
      });

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Failed to submit form:", error);

      // Show error SweetAlert
      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "There was an error uploading your content. Please try again.",
        confirmButtonColor: "#F6805C"
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      devoti: "",
      tagline: "",
      devotional: "",
      scriptureReference: "",
      status: "Active",
      image: null
    });
    setImagePreview(null);
    setValidationErrors({});
  };

  // Custom Select Component
  const CustomSelect = ({
    label,
    name,
    value,
    options,
    placeholder
  }: {
    label?: string;
    name: string;
    value: string;
    options: string[];
    placeholder: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasError = validationErrors[name];

    return (
      <div className="pb-[15px]">
        {label && (
          <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-[0.85rem]   text-[#656565] font-normal cursor-pointer  [&_svg]:stroke-red-500 focus:outline-none   ${
              hasError
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-[#F6805C]"
            } rounded-[8px] border ${hasError ? "border-red-500" : "border-[#AFAFAF]"} bg-[#FFF] text-left flex justify-between items-center`}
          >
            <span className="font-inter">{value || placeholder}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.293 7.293L10 12l4.707-4.707"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-[#AFAFAF] rounded-[8px] shadow-lg max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectChange(name, option);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50  text-[#656565]  font-mono text-[14px] transition-colors font-indie"
                  >
                    {option}
                  </button>
                  {index < options.length - 1 && (
                    <div className="mx-2 border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {hasError && (
          <p className="mt-1 text-sm text-red-500 font-dm-sans">{hasError}</p>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <h1 className="text-[#794A3A]  text-[18px] not-italic font-semibold leading-normal  pb-[20px]">
        Add New Devotional
      </h1>

      <div className="bg-[#F9F9F9] rounded-[16px] p-[15px] md:p-[30px]">
        <h2 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold mb-3">
          Thumbnail
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="pb-6">
            <div className="border-1 border-[#AFAFAF] rounded-[8px] gap-5 bg-[#FFF]  py-6 mb-4 flex flex-col items-center justify-center relative">
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <div className="relative w-24 h-24 rounded-[10px] overflow-hidden">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Profile Preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-[#F6805C] " />
                  <p className="text-[#FFF] font-[600] px-[12px] py-[12px] hover:bg-orange-600 bg-[#F6805C] rounded-[8px]  text-[14px] mt-1">
                    Upload Image
                  </p>
                </>
              )}
            </div>
            {validationErrors.image && (
              <p className="mt-1 text-sm text-red-500 font-dm-sans">
                {validationErrors.image}
              </p>
            )}
          </div>

          {/* Devoti */}
          <div className="pb-6">
            <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-3">
              Devotional Title
            </label>
            <input
              type="text"
              name="devoti"
              value={formData.devoti}
              onChange={handleInputChange}
              placeholder="Enter Development Title e.g., Measuring for Growth"
              className={`w-full px-4 py-3 rounded-[8px] border ${
                validationErrors.devoti ? "border-red-500" : "border-[#AFAFAF]"
              } bg-[#FFF] text-[#656565] font-normal focus:outline-none ${
                validationErrors.devoti
                  ? "focus:ring-red-500"
                  : "focus:ring-[#F6805C]"
              }`}
            />
            {validationErrors.devoti && (
              <p className="mt-1 text-sm text-red-500 font-dm-sans">
                {validationErrors.devoti}
              </p>
            )}
          </div>

          {/* Tagline */}
          <div className="pb-6">
            <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-3">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="Enter Tagline Text Here"
              className={`w-full px-4 py-3 rounded-[8px] border ${
                validationErrors.tagline ? "border-red-500" : "border-[#AFAFAF]"
              } bg-[#FFF] text-[#656565] font-normal focus:outline-none ${
                validationErrors.tagline
                  ? "focus:ring-red-500"
                  : "focus:ring-[#F6805C]"
              }`}
            />
            {validationErrors.tagline && (
              <p className="mt-1 text-sm text-red-500 font-dm-sans">
                {validationErrors.tagline}
              </p>
            )}
          </div>

          {/* Devotional */}
          <div className="pb-6">
            <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-3">
              Devotional Body
            </label>
            <textarea
              name="devotional"
              value={formData.devotional}
              onChange={handleInputChange}
              placeholder="Enter Devotional Text Here"
              rows={4}
              className={`w-full px-4 py-3 rounded-[8px] border ${
                validationErrors.devotional
                  ? "border-red-500"
                  : "border-[#AFAFAF]"
              } bg-[#FFF] text-[#656565] font-normal focus:outline-none ${
                validationErrors.devotional
                  ? "focus:ring-red-500"
                  : "focus:ring-[#F6805C]"
              } resize-none`}
            />
            {validationErrors.devotional && (
              <p className="mt-1 text-sm text-red-500 font-dm-sans">
                {validationErrors.devotional}
              </p>
            )}
          </div>

          {/* Scripture Reference */}
          <div className="pb-6">
            <h3 className="text-[#794A3A] font-dm-sans text-[16px] font-semibold pb-3">
              Scripture Reference
            </h3>
            <CustomSelect
              name="scriptureReference"
              value={formData.scriptureReference}
              options={scriptureReferences}
              placeholder="Select Scripture Reference e.g., Ephesians 4:14-16, James 12:24, Joq 5:8"
            />
          </div>

          {/* Status */}
          <div className="pb-6">
            <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-3">
              Status
            </label>

            <CustomSelect
              name="status"
              value={formData.status}
              options={statusOptions}
              placeholder="Select Status"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-[40px]  py-3 bg-[#F6805C] cursor-pointer text-white rounded-[10px] hover:bg-orange-600 transition-colors font-dm-sans text-[14px] font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HumanbrailUpload;
