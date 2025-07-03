"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  name,
  error,
  touched
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  name: string;
  error?: string;
  touched?: boolean;
}) => (
  <div>
    <label className="block mb-2 text-lg font-medium text-[#794A3A]">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full text-sm px-4 py-4 bg-white border ${error && touched ? "border-red-400" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex absolute inset-y-0 right-0 items-center px-4 text-gray-700 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    {error && touched && (
      <div className="mt-1 text-xs text-red-500">{error}</div>
    )}
  </div>
);

const validationSchema = Yup.object({
  totalQuestion: Yup.number()
    .typeError("Total Question must be a number")
    .integer("Total Question must be an integer")
    .positive("Total Question must be positive")
    .required("Total Question is required"),
  gameName: Yup.string().required("Game Name is required"),
  description: Yup.string().required("Description is required"),
  gameType: Yup.string().required("Game Type is required"),
  gameStatus: Yup.string().required("Game Status is required")
  // imageGeneration: Yup.boolean(), // No validation needed
});

const GenerateGameUsingAIModal = ({ onClose }: { onClose: () => void }) => {
  const [generateImage, setGenerateImage] = useState(false);

  const gameTypes = [
    { value: "Bible Trivia Quiz", label: "Bible Trivia Quiz" },
    { value: "Bible Answer Question", label: "Bible Answer Question" },
    { value: "Daily Challenges", label: "Daily Challenges" }
  ];

  const gameStatuses = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ];

  const formik = useFormik({
    initialValues: {
      totalQuestion: "",
      gameName: "",
      description: "",
      gameType: "",
      gameStatus: "Active"
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onClose();
    }
  });

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-lg bg-[#F9F9F9] rounded-2xl">
        <div className="p-4 md:p-8 overflow-y-auto max-h-[90vh] hide scrollbar-hide">
          <h2 className="mb-6 text-xl font-semibold text-center text-[#794A3A]">
            Add New Game
          </h2>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block mb-2 text-lg font-medium text-[#794A3A]">
                Total Question
              </label>
              <input
                type="text"
                name="totalQuestion"
                value={formik.values.totalQuestion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Total Question Number"
                className={`w-full px-4 py-4 bg-white border ${formik.touched.totalQuestion && formik.errors.totalQuestion ? "border-red-400" : "border-gray-300"} text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400`}
              />
              {formik.touched.totalQuestion && formik.errors.totalQuestion && (
                <div className="mt-1 text-xs text-red-500">
                  {formik.errors.totalQuestion}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium text-[#794A3A]">
                Game Name
              </label>
              <input
                type="text"
                name="gameName"
                value={formik.values.gameName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Game Name"
                className={`w-full px-4 py-4 text-sm bg-white border ${formik.touched.gameName && formik.errors.gameName ? "border-red-400" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400`}
              />
              {formik.touched.gameName && formik.errors.gameName && (
                <div className="mt-1 text-xs text-red-500">
                  {formik.errors.gameName}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium text-[#794A3A]">
                Description
              </label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Text Here"
                rows={4}
                className={`w-full text-sm px-4 py-4 bg-white border ${formik.touched.description && formik.errors.description ? "border-red-400" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400`}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="mt-1 text-xs text-red-500">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <CustomSelect
              label="Game Type"
              name="gameType"
              value={formik.values.gameType}
              onChange={formik.handleChange}
              options={gameTypes}
              placeholder="Select Game Type e.g, Bible Trivia Quiz"
              error={formik.errors.gameType}
              touched={formik.touched.gameType}
            />

            <CustomSelect
              label="Game Status"
              name="gameStatus"
              value={formik.values.gameStatus}
              onChange={formik.handleChange}
              options={gameStatuses}
              placeholder="Select Game Status"
              error={formik.errors.gameStatus}
              touched={formik.touched.gameStatus}
            />

            <div>
              <label className="block mb-2 text-lg font-medium text-[#794A3A]">
                Image Generation
              </label>
              <div className="flex justify-between items-center px-4 py-4 w-full text-sm bg-white rounded-lg border border-gray-300">
                <span>Do You Want To Generate An Image?</span>
                <div
                  onClick={() => setGenerateImage((p) => !p)}
                  className={`w-12 h-6 text-sm flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    generateImage ? "bg-[#F6805C]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      generateImage ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 cursor-pointer text-sm w-full font-semibold text-[#F6805C] bg-white border border-[#F6805C] rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-4 cursor-pointer  text-sm w-full font-semibold text-white bg-[#F6805C] rounded-lg hover:opacity-90"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateGameUsingAIModal;
