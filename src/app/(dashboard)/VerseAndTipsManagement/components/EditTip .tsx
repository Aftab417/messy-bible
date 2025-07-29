import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  text: string;
  date: string;
}

interface EditTipProps {
  onClose: () => void;
  initialData: {
    text: string;
    date: string;
  };
}

const validationSchema = Yup.object({
  tip: Yup.string().required("Tip is required"),
  date: Yup.string().required("Date is required")
});

const EditTip = ({ onClose, initialData }: EditTipProps) => {
  const formatDateToISO = (dateStr: string): string => {
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime()))
      return new Date().toISOString().split("T")[0]; // fallback
    return parsedDate.toISOString().split("T")[0];
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      text: initialData.text || "",
      date: formatDateToISO(initialData.date)
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }: FormikHelpers<FormValues>) => {
      resetForm();
      onClose();
    }
  });

  console.log(initialData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 backdrop-blur-sm bg-black/50">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 p-2 sm:p-5 md:p-10 w-full sm:min-w-lg max-w-md bg-[#F9F9F9] rounded-2xl "
      >
        <h2 className="text-center text-lg font-semibold text-[#794A3A] ">
          Edit Tip
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="date"
            className="text-[#794A3A] text-base font-semibold"
          >
            Select Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={`border text-[#656565] rounded-lg px-4 py-3 text-base focus:outline-none bg-white focus:ring-2 focus:ring-[#F6805C] ${formik.touched.date && formik.errors.date ? "border-red-400" : "border-[#AFAFAF]"}`}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.date && formik.errors.date && (
            <span className="mt-1 text-xs text-red-500">
              {formik.errors.date}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="tip"
            className="text-[#794A3A] text-base font-semibold"
          >
            Daily Tip
          </label>
          <textarea
            id="text"
            name="text"
            placeholder="Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy."
            className={`border text-[#656565] scrollbar-hide rounded-lg px-4 py-3 text-base min-h-[80px] resize-none focus:outline-none bg-white focus:ring-2 focus:ring-[#F6805C] ${formik.touched.text && formik.errors.text ? "border-red-400" : "border-[#AFAFAF]"}`}
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.text && formik.errors.text && (
            <span className="mt-1 text-xs text-red-500">
              {formik.errors.text}
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

export default EditTip;
