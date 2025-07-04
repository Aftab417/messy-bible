"use client"
import { useState } from "react"
import type React from "react"
import Swal from "sweetalert2";
import * as yup from "yup"

// Validation schema
const subscriptionSchema = yup.object({
  heading: yup.string().required("Plan name is required"),
  pricingPeriod: yup.string().required("Pricing period is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  subscriptionStatus: yup.string().required("Subscription status is required"),
  planOptions: yup
    .array()
    .of(
      yup.object({
        option: yup.string().required("Plan option is required"),
      }),
    )
    .min(1, "At least one plan option is required"),
})

type FormData = {
  heading: string
  pricingPeriod: string
  price: string
  subscriptionStatus: string
  planOptions: { option: string }[]
}

type FormErrors = {
  heading?: string
  pricingPeriod?: string
  price?: string
  subscriptionStatus?: string
  planOptions?: string | { option?: string }[]
}

export default function SubscriptionForm() {
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    pricingPeriod: "",
    price: "",
    subscriptionStatus: "",
    planOptions: [{ option: "" }],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = async () => {
    try {
      // Convert price to number for validation
      const dataToValidate = {
        ...formData,
        price: formData.price ? Number(formData.price) : undefined,
      }

      await subscriptionSchema.validate(dataToValidate, { abortEarly: false })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: FormErrors = {}

        error.inner.forEach((err) => {
          if (err.path) {
            if (err.path.includes("planOptions")) {
              // Handle plan options errors
              const match = err.path.match(/planOptions\[(\d+)\]\.option/)
              if (match) {
                const index = Number.parseInt(match[1])
                if (!Array.isArray(newErrors.planOptions)) {
                  newErrors.planOptions = []
                }
                if (!newErrors.planOptions[index]) {
                  newErrors.planOptions[index] = {}
                }
                newErrors.planOptions[index].option = err.message
              } else if (err.path === "planOptions") {
                newErrors.planOptions = err.message
              }
            } else {
              newErrors[err.path as keyof FormErrors] = err.message
            }
          }
        })

        setErrors(newErrors)
      }
      return false
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handlePlanOptionChange = (index: number, value: string) => {
    const newPlanOptions = [...formData.planOptions]
    newPlanOptions[index] = { option: value }
    setFormData((prev) => ({
      ...prev,
      planOptions: newPlanOptions,
    }))

    // Clear specific plan option error
    if (Array.isArray(errors.planOptions) && errors.planOptions[index]) {
      const newErrors = [...(errors.planOptions as { option?: string }[])]
      newErrors[index] = { option: undefined }
      setErrors((prev) => ({
        ...prev,
        planOptions: newErrors,
      }))
    }
  }

  const addPlanOption = () => {
    setFormData((prev) => ({
      ...prev,
      planOptions: [...prev.planOptions, { option: "" }],
    }))
  }

  const removePlanOption = (index: number) => {
    if (formData.planOptions.length > 1) {
      const newPlanOptions = formData.planOptions.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        planOptions: newPlanOptions,
      }))

      // Remove corresponding error
      if (Array.isArray(errors.planOptions)) {
        const newErrors = (errors.planOptions as { option?: string }[]).filter((_, i) => i !== index)
        setErrors((prev) => ({
          ...prev,
          planOptions: newErrors,
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = await validateForm()
    if (isValid) {
      console.log("Form submitted:", {
        ...formData,
        price: Number(formData.price),
      })
      
      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Subscription plan has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f97316', // orange-500
      }).then(() => {
        // Reset form after success
        setFormData({
          heading: "",
          pricingPeriod: "",
          price: "",
          subscriptionStatus: "",
          planOptions: [{ option: "" }],
        })
      })
    }
  }

  return (

    <>
       <h1 className="text-[#794A3A]  text-[18px] not-italic font-semibold leading-normal pt-[30px] pb-[20px]">
        Add New Devotional
      </h1>
 
    <div className="bg-[#F9F9F9] rounded-[16px] p-[15px] md:p-[30px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading Section */}
        <div className="space-y-2">
            <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-2">
          Heading
            </label>
          <input
            id="heading"
            type="text"
            value={formData.heading}
            onChange={(e) => handleInputChange("heading", e.target.value)}
            placeholder="Enter Plan Name (e.g Freemium, monthly etc)"
            className="w-full px-4 py-3 rounded-[8px] border bg-[#FFF] text-[#656565] font-normal focus:outline-none"
          />
          {errors.heading && <p className="text-sm text-red-600">{errors.heading}</p>}
        </div>

        {/* Pricing Section */}
        <div className="space-y-2">
             <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-2">
           Pricing
            </label>
          
          <div className="flex gap-3">
            <select
              value={formData.pricingPeriod}
              onChange={(e) => handleInputChange("pricingPeriod", e.target.value)}

              className="w-32 px-4 py-3 rounded-[8px] border bg-[#FFF] text-[#656565] font-normal focus:outline-none"
            
           >
              <option value="">Month</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="week">Week</option>
            </select>
            <div className="flex-1 relative">
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="1200"
              className="w-full px-4 py-3 rounded-[8px] border bg-[#FFF] text-[#656565] font-normal focus:outline-none"
              
             />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            </div>
          </div>
          {errors.pricingPeriod && <p className="text-sm text-red-600">{errors.pricingPeriod}</p>}
          {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
        </div>

        {/* Subscription Status */}
        <div className="space-y-2">
           
          <label className="text-[#794A3A] font-dm-sans text-[16px] font-semibold leading-none block pb-2">
         Subscription Status
            </label>
          <select
            value={formData.subscriptionStatus}
            onChange={(e) => handleInputChange("subscriptionStatus", e.target.value)}
              className="w-full px-4 py-3 rounded-[8px] border bg-[#FFF] text-[#656565] font-normal  focus:outline-none"
           
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.subscriptionStatus && <p className="text-sm text-red-600">{errors.subscriptionStatus}</p>}
        </div>

        {/* Everything in Membership Plus Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Everything in Membership Plus:</label>
            <button
              type="button"
              onClick={addPlanOption}
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Plan Option
            </button>
          </div>

          <div className="space-y-3">
            {formData.planOptions.map((planOption, index) => (
              <div key={index} className="space-y-1">
                <label className="block text-sm text-gray-600">Plan Option {index + 1}:</label>
                <div className="flex gap-2">
                  <textarea
                    value={planOption.option}
                    onChange={(e) => handlePlanOptionChange(index, e.target.value)}
                    placeholder={`Plan Option ${index + 1}:`}
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                  />
                  {formData.planOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlanOption(index)}
                      className="self-start mt-1 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {Array.isArray(errors.planOptions) && errors.planOptions[index]?.option && (
                  <p className="text-sm text-red-600">{errors.planOptions[index].option}</p>
                )}
              </div>
            ))}
          </div>
          {typeof errors.planOptions === "string" && <p className="text-sm text-red-600">{errors.planOptions}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Add Subscription
          </button>
        </div>
      </form>
    </div>
       </>
  )
}