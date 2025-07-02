import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  tagLine: string;
  verse: string;
}

interface EditVerseProps {
  onClose: () => void;
  initialData: {
    id: number;
    badge: string;
    text: string;
  };
}

const validationSchema = Yup.object({
  tagLine: Yup.string().required("Tag Line is required"),
  verse: Yup.string().required("Verse is required")
});

const EditVerse = ({ onClose, initialData }: EditVerseProps) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      tagLine: initialData.badge,
      verse: initialData.text
    },
    validationSchema,
    onSubmit: (values, { resetForm }: FormikHelpers<FormValues>) => {
      // You would normally update the verse here (e.g., API call or state update)
      console.log("Updated verse:", values);
      resetForm();
      onClose();
    }
  });

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center px-2 backdrop-blur-sm bg-black/50">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 p-2 sm:p-5 md:p-10 w-full  sm:min-w-lg max-w-md bg-[#F9F9F9] rounded-2xl "
      >
        <h2 className="text-center text-lg font-semibold text-[#794A3A] ">
          Edit Verse
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tagLine"
            className="text-[#794A3A] text-lg font-semibold"
          >
            Tag Line
          </label>
          <input
            id="tagLine"
            name="tagLine"
            type="text"
            placeholder='Text (e.g., "Have A Blessed Day!")'
            className={`border rounded-lg px-4 py-3 text-base focus:outline-none bg-white focus:ring-2 focus:ring-[#F6805C] ${formik.touched.tagLine && formik.errors.tagLine ? "border-red-400" : "border-[#AFAFAF]"}`}
            value={formik.values.tagLine}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tagLine && formik.errors.tagLine && (
            <span className="mt-1 text-xs text-red-500">
              {formik.errors.tagLine}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="verse"
            className="text-[#794A3A] text-lg font-semibold"
          >
            Verse Of The Day
          </label>
          <textarea
            id="verse"
            name="verse"
            placeholder='"For I Know The Plans I Have For You," Declares The LORD...'
            className={`border rounded-lg px-4 py-3 text-base min-h-[80px] resize-none focus:outline-none bg-white focus:ring-2 focus:ring-[#F6805C] ${formik.touched.verse && formik.errors.verse ? "border-red-400" : "border-[#AFAFAF]"}`}
            value={formik.values.verse}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.verse && formik.errors.verse && (
            <span className="mt-1 text-xs text-red-500">
              {formik.errors.verse}
            </span>
          )}
        </div>
        <div className="flex gap-6 mt-2">
          <button
            type="button"
            className="flex-1 cursor-pointer py-3 rounded-lg border border-[#F6805C] text-[#F6805C] font-semibold text-base transition hover:bg-[#FFF3F0]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 cursor-pointer py-3 rounded-lg bg-[#F6805C] text-white font-semibold text-base transition hover:bg-[#e96a4a]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVerse;
