"use client";
import React, { useRef } from "react";
import { useFormik, FieldArray, FormikProvider, FormikErrors } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const gameTypes = [
  { value: "Bible Trivia Quiz", label: "Bible Trivia Quiz" },
  { value: "Bible Answer Question", label: "Bible Answer Question" },
  { value: "Daily Challenges", label: "Daily Challenges" }
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
      // handle submit
      console.log(values);
    }
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("thumbnail", e.target.files[0]);
    }
  };

  // Helper to safely get nested errors
  function getQuestionError<T extends keyof Question>(
    errors: FormikErrors<FormValues>["questions"],
    idx: number,
    key: T
  ): string | undefined {
    if (
      Array.isArray(errors) &&
      errors[idx] &&
      typeof errors[idx] === "object" &&
      errors[idx] !== null
    ) {
      const err = errors[idx] as FormikErrors<Question>;
      if (typeof err[key] === "string") return err[key] as string;
    }
    return undefined;
  }

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg  font-semibold text-[#794A3A]">Add New Game</h2>
        <button
          type="button"
          onClick={formik.submitForm}
          className="px-3 text-sm py-3 cursor-pointer text-white bg-[#F6805C] rounded-lg font-semibold hover:opacity-90"
        >
          Publish
        </button>
      </div>
      <div className="p-6 mx-auto w-full bg-[#F9F9F9] rounded-xl ">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-[#794A3A] font-medium">
              Thumbnail
            </label>

            <div className="border border-[#E5E5E5] bg-white rounded-lg flex items-center justify-center h-32 mb-2 relative overflow-hidden">
              {formik.values.thumbnail ? (
                // Show uploaded image
                <Image
                  src={URL.createObjectURL(formik.values.thumbnail)}
                  alt="Uploaded Thumbnail"
                  width={120}
                  height={120}
                  className="object-contain w-auto h-full py-5 rounded-lg"
                />
              ) : (
                // Show icon + upload button initially
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
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none"
            >
              <option value="" disabled>
                Select Game Type e.g, Bible Trivia Quiz
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
              className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none"
            >
              <option value="" disabled>
                Select Game Status
              </option>
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

          {/* First Question */}
          <FormikProvider value={formik}>
            <FieldArray name="questions">
              {({ push }) => (
                <div className="mb-4">
                  <label className="block mb-2 text-[#794A3A] font-medium">
                    Guess the Bible verse
                  </label>
                  {formik.values.questions.map((q, qIdx) => (
                    <div key={qIdx} className="">
                      <input
                        type="text"
                        name={`questions[${qIdx}].question`}
                        value={q.question}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Who led the Israelites out of Egypt?"
                        className="w-full px-4 py-3 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 mb-3"
                      />
                      {formik.touched.questions?.[qIdx]?.question &&
                        getQuestionError(
                          formik.errors.questions,
                          qIdx,
                          "question"
                        ) && (
                          <div className="mb-2 text-xs text-red-500">
                            {getQuestionError(
                              formik.errors.questions,
                              qIdx,
                              "question"
                            )}
                          </div>
                        )}
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="relative mb-2">
                          <input
                            type="text"
                            name={`questions[${qIdx}].options[${optIdx}]`}
                            value={opt}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={`Enter Option ${optIdx + 1}`}
                            className="flex-1 w-full px-4 py-2 pr-10 border border-[#E5E5E5] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
                            className={`absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 
              appearance-none border-2 rounded-full 
              ${q.correctAnswer === optIdx ? "border-[#F6805C]  bg-[#F6805C]" : "border-[#F6805C]"}
              checked:accent-[#F6805C] `}
                          />
                        </div>
                      ))}
                      {formik.touched.questions?.[qIdx]?.options &&
                        getQuestionError(
                          formik.errors.questions,
                          qIdx,
                          "options"
                        ) && (
                          <div className="mb-2 text-xs text-red-500">
                            {getQuestionError(
                              formik.errors.questions,
                              qIdx,
                              "options"
                            )}
                          </div>
                        )}
                      {formik.touched.questions?.[qIdx]?.correctAnswer &&
                        getQuestionError(
                          formik.errors.questions,
                          qIdx,
                          "correctAnswer"
                        ) && (
                          <div className="mb-2 text-xs text-red-500">
                            {getQuestionError(
                              formik.errors.questions,
                              qIdx,
                              "correctAnswer"
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                  <div className="flex justify-end pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          question: "",
                          options: ["", "", "", ""],
                          correctAnswer: 0
                        })
                      }
                      className="px-6 py-4 text-sm bg-[#F6805C] cursor-pointer text-white rounded-lg font-semibold hover:opacity-90"
                    >
                      + Add New Question
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </FormikProvider>
        </form>
      </div>
    </main>
  );
};

export default GenerateGameManually;
