"use client";
import React, { useRef } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const gameTypes = [
  { value: "Bible Trivia Quiz", label: "Bible Trivia Quiz" },
  { value: "Search Words", label: "Search Words" },
  { value: "Bible Emoji Translator", label: "Bible Emoji Translator" }
];

const gameStatuses = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" }
];

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type FormValues = {
  thumbnail: File | null;
  heading: string;
  description: string;
  gameType: string;
  gameStatus: string;
  questions: Question[];
};

const validationSchema = Yup.object({
  heading: Yup.string().required("Heading is required"),
  description: Yup.string().required("Description is required"),
  gameType: Yup.string().required("Game Type is required"),
  gameStatus: Yup.string().required("Game Status is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(Yup.string().required("Option is required"))
          .min(4, "Must have 4 options"),
        correctAnswer: Yup.number()
          .min(0, "Select the correct answer")
          .max(3, "Select the correct answer")
          .required("Select the correct answer")
      })
    )
    .min(1, "At least one question is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required")
});

const GenerateGameManually = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      thumbnail: null,
      heading: "",
      description: "",
      gameType: "",
      gameStatus: "Active",
      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0
        }
      ]
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("thumbnail", e.target.files[0]);
    }
  };

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#794A3A]">Add New Game</h2>
        <button
          type="button"
          onClick={formik.submitForm}
          className="px-3 text-sm py-3 cursor-pointer text-white bg-[#F6805C] rounded-lg font-semibold hover:opacity-90"
        >
          Publish
        </button>
      </div>

      <div className="p-6 mx-auto w-full bg-[#F9F9F9] rounded-xl">
        <form onSubmit={formik.handleSubmit}>
          {/* Thumbnail */}
          <div className="mb-6">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Thumbnail
            </label>
            <div className="border border-[#E5E5E5] bg-white rounded-lg flex items-center justify-center h-32 mb-2 relative overflow-hidden">
              {formik.values.thumbnail ? (
                <Image
                  src={URL.createObjectURL(formik.values.thumbnail)}
                  alt="Uploaded Thumbnail"
                  width={120}
                  height={120}
                  className="object-contain w-auto h-full py-5 rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/arrowUpFile.png"
                    alt="Upload Icon"
                    width={40}
                    height={40}
                    className="object-contain mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-1 cursor-pointer text-sm bg-[#F6805C] text-white rounded-md shadow hover:opacity-90"
                  >
                    Upload image
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </div>
            {formik.touched.thumbnail && formik.errors.thumbnail && (
              <div className="mt-1 text-xs text-red-500">
                {formik.errors.thumbnail as string}
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="mb-4">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={formik.values.heading}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Heading"
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg"
            />
            {formik.touched.heading && formik.errors.heading && (
              <div className="mt-1 text-xs text-red-500">
                {formik.errors.heading}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Text"
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="mt-1 text-xs text-red-500">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Game Type */}
          <div className="mb-4">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Game Type
            </label>
            <select
              name="gameType"
              value={formik.values.gameType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg"
            >
              <option value="" disabled>
                Select Game Type
              </option>
              {gameTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {formik.touched.gameType && formik.errors.gameType && (
              <div className="mt-1 text-xs text-red-500">
                {formik.errors.gameType}
              </div>
            )}
          </div>

          {/* Game Status */}
          <div className="mb-4">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Game Status
            </label>
            <select
              name="gameStatus"
              value={formik.values.gameStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg"
            >
              {gameStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {formik.touched.gameStatus && formik.errors.gameStatus && (
              <div className="mt-1 text-xs text-red-500">
                {formik.errors.gameStatus}
              </div>
            )}
          </div>

          {/* Conditional Game Section */}
          <FormikProvider value={formik}>
            <FieldArray name="questions">
              {({ push }) => (
                <>
                  {formik.values.gameType === "Bible Trivia Quiz" &&
                    formik.values.questions.map((q, qIdx) => (
                      <div key={qIdx}>
                        <input
                          type="text"
                          name={`questions[${qIdx}].question`}
                          value={q.question}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Who led the Israelites out of Egypt?"
                          className="w-full px-4 py-3 mb-3 bg-white border rounded-lg"
                        />
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="relative mb-2">
                            <input
                              type="text"
                              name={`questions[${qIdx}].options[${optIdx}]`}
                              value={opt}
                              onChange={formik.handleChange}
                              placeholder={`Option ${optIdx + 1}`}
                              className="w-full px-4 py-2 bg-white border rounded-lg"
                            />
                            <input
                              type="radio"
                              name={`questions[${qIdx}].correctAnswer`}
                              checked={q.correctAnswer === optIdx}
                              onChange={() =>
                                formik.setFieldValue(
                                  `questions[${qIdx}].correctAnswer`,
                                  optIdx
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 rounded-full border-[#F6805C]"
                            />
                          </div>
                        ))}
                      </div>
                    ))}

                  {formik.values.gameType === "Search Words" && (
                    <div>
                      <p className="font-semibold text-[#794A3A] mb-2">
                        First Verse
                      </p>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-[#E5E5E5] mb-6 rounded-lg"
                        placeholder="For God so loved the ____, that He gave His only _____ Son, that whoever believes in Him should not perish but have _____ life."
                      />
                      <div className="flex justify-center mb-8">
                        <Image
                          src="/images/searchword.png"
                          width={200}
                          height={200}
                          alt="Search Word Grid 1"
                        />
                      </div>

                      <p className="font-semibold text-[#794A3A] mb-2">
                        Second Verse
                      </p>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white border border-[#E5E5E5] mb-6 rounded-lg"
                        placeholder="For God so loved the ____, that He gave His only _____ Son, that whoever believes in Him should not perish but have _____ life."
                      />
                      <div className="flex justify-center">
                        <Image
                          src="/images/searchword.png"
                          width={200}
                          height={200}
                          alt="Search Word Grid 2"
                        />
                      </div>
                    </div>
                  )}

                  {formik.values.gameType === "Bible Emoji Translator" &&
                    formik.values.questions.map((q, qIdx) => (
                      <div key={qIdx}>
                        <h1 className="block mb-2 text-[#794A3A] font-medium">
                          Guess the Bible verse{" "}
                        </h1>
                        <input
                          type="text"
                          name={`questions[${qIdx}].question`}
                          value={q.question}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="👑+🐑+🦁 ?"
                          className="w-full px-4 py-3 mb-3 bg-white border rounded-lg"
                        />
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="relative mb-2">
                            <input
                              type="text"
                              name={`questions[${qIdx}].options[${optIdx}]`}
                              value={opt}
                              onChange={formik.handleChange}
                              placeholder={`Option ${optIdx + 1}`}
                              className="w-full px-4 py-2 bg-white border rounded-lg"
                            />
                            <input
                              type="radio"
                              name={`questions[${qIdx}].correctAnswer`}
                              checked={q.correctAnswer === optIdx}
                              onChange={() =>
                                formik.setFieldValue(
                                  `questions[${qIdx}].correctAnswer`,
                                  optIdx
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 rounded-full border-[#F6805C]"
                            />
                          </div>
                        ))}
                      </div>
                    ))}

                  {/* Universal Add Button */}
                  <div className="flex justify-end pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        const type = formik.values.gameType;
                        if (type === "Bible Trivia Quiz") {
                          push({
                            question: "",
                            options: ["", "", "", ""],
                            correctAnswer: 0
                          });
                        } else if (type === "Search Words") {
                          alert(
                            "Add logic for new verse or word search puzzle here."
                          );
                        } else if (type === "Bible Emoji Translator") {
                          alert("Add logic for emoji translator entry here.");
                        }
                      }}
                      className="px-6 py-4 text-sm bg-[#F6805C] cursor-pointer text-white rounded-lg font-semibold hover:opacity-90"
                    >
                      + Add New Question
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
          </FormikProvider>
        </form>
      </div>
    </main>
  );
};

export default GenerateGameManually;
