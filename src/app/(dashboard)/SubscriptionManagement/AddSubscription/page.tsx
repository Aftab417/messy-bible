"use client";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

// Validation schema
const subscriptionSchema = yup.object({
  heading: yup.string().required("Plan name is required"),
  pricingPeriod: yup.string().required("Pricing period is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  subscriptionStatus: yup.string().required("Subscription status is required"),
  planOptions: yup
    .array()
    .of(
      yup.object({
        option: yup.string().required("Plan option is required")
      })
    )
    .min(1, "At least one plan option is required")
});

// Define the type for a plan option
interface SubscriptionPlanOption {
  option: string;
}

export default function AddSubscription() {
  const formik = useFormik<{
    heading: string;
    pricingPeriod: string;
    price: string;
    subscriptionStatus: string;
    planOptions: SubscriptionPlanOption[];
  }>({
    initialValues: {
      heading: "",
      pricingPeriod: "",
      price: "",
      subscriptionStatus: "",
      planOptions: [{ option: "" }]
    },
    validationSchema: subscriptionSchema,
    onSubmit: (values, { resetForm }) => {
      Swal.fire({
        title: "Success!",
        text: "Subscription plan has been added successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316"
      }).then(() => {
        resetForm();
      });
    }
  });

  const addPlanOption = () => {
    formik.setFieldValue("planOptions", [
      ...formik.values.planOptions,
      { option: "" }
    ]);
  };

  const removePlanOption = (index: number) => {
    if (formik.values.planOptions.length > 1) {
      const newOptions: SubscriptionPlanOption[] =
        formik.values.planOptions.filter((_, i) => i !== index);
      formik.setFieldValue("planOptions", newOptions);
    }
  };

  return (
    <>
      <h1 className="text-[#794A3A]  text-lg pt-7 pb-7  font-semibold">
        Add New Subscription
      </h1>

      <div className="bg-[#F9F9F9] rounded-2xl p-5 ">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Heading Section */}
          <div className="space-y-2">
            <label className="text-[#794A3A] font-semibold text-sm block pb-2">
              Heading
            </label>
            <input
              id="heading"
              type="text"
              {...formik.getFieldProps("heading")}
              placeholder="Enter Plan Name (e.g Freemium, monthly etc)"
              className="w-full text-sm px-4 py-4 rounded-lg border border-[#AFAFAF] bg-[#FFFfff] text-[#5B5B5B] font-normal focus:outline-none"
            />
            {formik.touched.heading && formik.errors.heading && (
              <p className="text-sm text-red-600">{formik.errors.heading}</p>
            )}
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <label className="text-[#794A3A] font-semibold text-sm block pb-2">
              Pricing
            </label>

            <div className="flex gap-3">
              <div className="relative w-32 cursor-pointer">
                <select
                  id="pricingPeriod"
                  {...formik.getFieldProps("pricingPeriod")}
                  className="appearance-none cursor-pointer w-full text-sm px-4 py-4 pr-10 rounded-lg border border-[#AFAFAF] bg-white text-[#5B5B5B] font-normal focus:outline-none"
                >
                  <option value="">Month</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                  <option value="week">Week</option>
                </select>

                {/* Custom arrow */}
                <div className="pointer-events-none cursor-pointer absolute inset-y-0 right-3 flex items-center text-[#5B5B5B]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative flex-1">
                <input
                  id="price"
                  type="number"
                  {...formik.getFieldProps("price")}
                  placeholder="1200$"
                  className="w-full text-sm px-4 py-4 rounded-lg border border-[#AFAFAF] bg-[#FFFfff] text-[#5B5B5B]  font-normal focus:outline-none"
                />
              </div>
            </div>
            {formik.touched.pricingPeriod && formik.errors.pricingPeriod && (
              <p className="text-sm text-red-600">
                {formik.errors.pricingPeriod}
              </p>
            )}
            {formik.touched.price && formik.errors.price && (
              <p className="text-sm text-red-600">{formik.errors.price}</p>
            )}
          </div>

          {/* Subscription Status */}
          <div className="relative space-y-2">
            <label className="text-[#794A3A] font-semibold text-sm block pb-2">
              Subscription Status
            </label>

            <div className="relative">
              <select
                id="subscriptionStatus"
                {...formik.getFieldProps("subscriptionStatus")}
                className="appearance-none cursor-pointer w-full text-sm px-4 py-4 pr-10 rounded-lg border border-[#AFAFAF] bg-[#FFFFFF] text-[#5B5B5B] font-normal focus:outline-none"
              >
                <option value="">Active</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#F6805C]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {formik.touched.subscriptionStatus &&
              formik.errors.subscriptionStatus && (
                <p className="text-sm text-red-600">
                  {formik.errors.subscriptionStatus}
                </p>
              )}
          </div>

          {/* Everything in Membership Plus Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[#794A3A] font-semibold text-sm block pb-2">
                Everything in Membership Plus:
              </label>
              <button
                type="button"
                onClick={addPlanOption}
                className="flex gap-2 items-center px-4 py-2 text-sm text-white bg-[#6AC8C4] cursor-pointer rounded-md transition-colors hover:bg-[#65b1ac] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Plan Options
              </button>
            </div>

            <div className="space-y-3">
              {formik.values.planOptions.map((planOption, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={planOption.option}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newOptions: SubscriptionPlanOption[] = [
                          ...formik.values.planOptions
                        ];
                        newOptions[index].option = e.target.value;
                        formik.setFieldValue("planOptions", newOptions);
                      }}
                      placeholder={`Plan Option ${index + 1}:`}
                      className="w-full text-sm px-4 py-4 rounded-lg border border-[#AFAFAF] bg-[#FFFfff] text-[#5B5B5B] font-normal focus:outline-none"
                    />

                    {formik.values.planOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePlanOption(index)}
                        className="self-start px-3 py-1 mt-1 text-sm text-red-600 rounded-md border border-red-300 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {formik.touched.planOptions &&
                    Array.isArray(formik.errors.planOptions) &&
                    formik.errors.planOptions[index] &&
                    typeof formik.errors.planOptions[index] === "object" &&
                    (formik.errors.planOptions[index] as { option?: string })
                      .option && (
                      <p className="text-sm text-red-600">
                        {
                          (
                            formik.errors.planOptions[index] as {
                              option?: string;
                            }
                          ).option
                        }
                      </p>
                    )}
                </div>
              ))}
            </div>
            {formik.touched.planOptions &&
              typeof formik.errors.planOptions === "string" && (
                <p className="text-sm text-red-600">
                  {formik.errors.planOptions}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-4 text-sm font-medium text-white bg-[#F6805C] rounded-md transition-colors hover:bg-[#f6805ce8] focus:outline-none focus:ring-2 focus:ring-[#F6805C] focus:ring-offset-2"
            >
              Add Subscription
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
