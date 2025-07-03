"use client";

import type React from "react";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Upload, ChevronDown, Plus , Minus } from "lucide-react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Swal from "sweetalert2";

// Validation schemas - Only required field validation
const step1Schema = Yup.object().shape({
  firstName: Yup.string().required("Lesson name is required"),
  description: Yup.string().required("Description is required"),
  ageGroup: Yup.string()
    .required("Age group is required")
    .notOneOf(["Select Age Group (5-8)"], "Please select a valid age group"),
  bibleReference: Yup.string().required("Bible reference is required"),
  studyPlan: Yup.string()
    .required("Study plan is required")
    .notOneOf(
      ["Select Study Plan (e.g. 7 day)"],
      "Please select a valid study plan"
    ),
  saveAs: Yup.string()
    .required("Visibility is required")
    .oneOf(["public", "private"], "Please select visibility")
});

const topicSchema = Yup.object().shape({
  topicName: Yup.string().required("Topic name is required"),
  scriptureReference: Yup.string().required("Scripture reference is required"),
  description: Yup.string().required("Description is required"),
  verseHighlight: Yup.string().required("Verse highlight is required"),
  reflectionQuestion: Yup.string().required("Reflection question is required")
});

const step2Schema = Yup.object().shape({
  topics: Yup.array().of(topicSchema).min(1, "At least one topic is required")
});

const AddLesson = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [topicValidationErrors, setTopicValidationErrors] = useState<
    Record<number, Record<string, string>>
  >({});

  // Form state
  const [formData, setFormData] = useState({
    // Step 1 fields
    firstName: "",
    description: "",
    ageGroup: "",
    bibleReference: "",
    studyPlan: "",
    saveAs: "",
    profilePhoto: null as File | null,

    // Step 2 fields
    topics: [] as Array<{
      id: number;
      topicName: string;
      scriptureReference: string;
      description: string;
      verseHighlight: string;
      reflectionQuestion: string;
      isExpanded: boolean;
      isSaved: boolean;
    }>
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Dropdown options - Updated to only include 7 and 30 day plans
  const ageGroups = [
    "Under 13",
    "13–17",
    "18–24",
    "25–34",
    "35–44",
    "45–60",
    "60+"
  ];

  const bibleReferences = [
    "Genesis 1:1",
    "John 3:16",
    "Psalm 23",
    "Matthew 5:16",
    "Romans 8:28",
    "Philippians 4:13",
    "1 Corinthians 13"
  ];

  const studyPlans = [
    "Select Study Plan (e.g. 7 day)",
    "7 Day Plan",
    "30 Day Plan"
  ];

  // Generate topics based on study plan
  const generateTopicsForPlan = (planType: string) => {
    let numberOfTopics = 0;

    switch (planType) {
      case "7 Day Plan":
        numberOfTopics = 7;
        break;
      case "30 Day Plan":
        numberOfTopics = 30;
        break;
      default:
        numberOfTopics = 0;
    }

    if (numberOfTopics === 0) return [];

    return Array.from({ length: numberOfTopics }, (_, index) => ({
      id: index + 1,
      topicName: "",
      scriptureReference: "",
      description: "",
      verseHighlight: "",
      reflectionQuestion: "",
      isExpanded: index === 0, // Only first topic expanded by default
      isSaved: false
    }));
  };

  // Check if topics have any data
  const topicsHaveData = (topics: typeof formData.topics) => {
    return topics.some(
      (topic) =>
        topic.topicName ||
        topic.scriptureReference ||
        topic.description ||
        topic.verseHighlight ||
        topic.reflectionQuestion
    );
  };

  // Check if at least one topic is completed
  const hasAtLeastOneCompletedTopic = () => {
    return formData.topics.some((topic) => topic.isSaved);
  };

  // Watch for study plan changes and generate topics (only if no existing data)
  useEffect(() => {
    if (
      formData.studyPlan &&
      formData.studyPlan !== "Select Study Plan (e.g. 7 day)"
    ) {
      const newTopics = generateTopicsForPlan(formData.studyPlan);

      // Only regenerate topics if current topics are empty or don't match the plan length
      if (
        formData.topics.length === 0 ||
        (formData.topics.length !== newTopics.length &&
          !topicsHaveData(formData.topics))
      ) {
        setFormData((prev) => ({
          ...prev,
          topics: newTopics
        }));
      } else if (
        formData.topics.length !== newTopics.length &&
        topicsHaveData(formData.topics)
      ) {
        // If topics have data but plan changed, ask user for confirmation
        const confirmChange = window.confirm(
          "Changing the study plan will reset all topic data. Are you sure you want to continue?"
        );
        if (confirmChange) {
          setFormData((prev) => ({
            ...prev,
            topics: newTopics
          }));
        } else {
          // Revert the study plan selection
          setFormData((prev) => ({
            ...prev,
            studyPlan: prev.topics.length === 7 ? "7 Day Plan" : "30 Day Plan"
          }));
        }
      }
    } else if (
      !formData.studyPlan ||
      formData.studyPlan === "Select Study Plan (e.g. 7 day)"
    ) {
      // Only clear topics if they don't have data
      if (!topicsHaveData(formData.topics)) {
        setFormData((prev) => ({
          ...prev,
          topics: []
        }));
      }
    }
  }, [formData.studyPlan]);

  // Validate step
  const validateStep = async (step: number) => {
    try {
      setValidationErrors({});

      if (step === 1) {
        await step1Schema.validate(formData, { abortEarly: false });
      } else {
        await step2Schema.validate(formData, { abortEarly: false });
      }
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

  // Validate individual topic
  const validateTopic = async (topicIndex: number) => {
    try {
      const topic = formData.topics[topicIndex];
      await topicSchema.validate(topic, { abortEarly: false });

      // Clear errors for this topic
      setTopicValidationErrors((prev) => ({
        ...prev,
        [topicIndex]: {}
      }));

      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });

        setTopicValidationErrors((prev) => ({
          ...prev,
          [topicIndex]: errors
        }));

        // Show SweetAlert error
        await Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: `Topic ${topicIndex + 1}: ${error.inner[0]?.message}`,
          confirmButtonColor: "#F6805C"
        });
      }
      return false;
    }
  };

  // Validate lesson creation requirements
  const validateLessonCreation = async () => {
    // Check if at least one topic is completed
    if (!hasAtLeastOneCompletedTopic()) {
      await Swal.fire({
        icon: "warning",
        title: "No Topics Completed",
        text: "Please complete at least one topic before creating the lesson.",
        confirmButtonColor: "#F6805C"
      });
      return false;
    }

    return true;
  };

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

  // Handle radio button changes
  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      saveAs: value
    }));

    // Clear validation error for this field
    if (validationErrors.saveAs) {
      setValidationErrors((prev) => ({
        ...prev,
        saveAs: ""
      }));
    }
  };

  // Handle topic changes
  const handleTopicChange = (topicId: number, field: string, value: string) => {
    const topicIndex = formData.topics.findIndex(
      (topic) => topic.id === topicId
    );

    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? { ...topic, [field]: value, isSaved: false }
          : topic
      )
    }));

    // Clear validation error for this topic field
    if (topicValidationErrors[topicIndex]?.[field]) {
      setTopicValidationErrors((prev) => ({
        ...prev,
        [topicIndex]: {
          ...prev[topicIndex],
          [field]: ""
        }
      }));
    }
  };

  // Toggle topic expansion
  const toggleTopicExpansion = (topicId: number) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === topicId
          ? { ...topic, isExpanded: !topic.isExpanded }
          : topic
      )
    }));
  };

  // Save individual topic
  const saveTopic = async (topicIndex: number) => {
    const isValid = await validateTopic(topicIndex);

    if (!isValid) return;

    // Mark topic as saved and move to next topic
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic, index) =>
        index === topicIndex
          ? { ...topic, isSaved: true, isExpanded: false }
          : index === topicIndex + 1
            ? { ...topic, isExpanded: true }
            : { ...topic, isExpanded: false }
      )
    }));

    // Show simple toast message instead of SweetAlert
    toast.success(`Topic ${topicIndex + 1} saved successfully!`);

    // If this was the last topic, show completion message
    if (topicIndex === formData.topics.length - 1) {
      toast.success("All topics completed! You can now create the lesson.");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      const isValid = await validateStep(1);
      if (!isValid) return;

      setCurrentStep(2);
      return;
    }

    // Check if at least one topic is completed
    const canCreateLesson = await validateLessonCreation();
    if (!canCreateLesson) return;

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("ageGroup", formData.ageGroup);
      formDataToSend.append("bibleReference", formData.bibleReference);
      formDataToSend.append("studyPlan", formData.studyPlan);
      formDataToSend.append("saveAs", formData.saveAs);
      formDataToSend.append(
        "topics",
        JSON.stringify(formData.topics.filter((topic) => topic.isSaved))
      );

      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call API to add lesson
      console.log("Submitting lesson data:", formData);

      // Show success SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Lesson Created Successfully!",
        text: `Your lesson has been created with ${formData.topics.filter((topic) => topic.isSaved).length} completed topics.`,
        confirmButtonColor: "#F6805C"
      });

      // Reset form
      resetForm();
      setCurrentStep(1);
    } catch (error) {
      console.error("Failed to add lesson:", error);

      // Show error SweetAlert
      await Swal.fire({
        icon: "error",
        title: "Failed to Create Lesson",
        text: "There was an error creating your lesson. Please try again.",
        confirmButtonColor: "#F6805C"
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      description: "",
      ageGroup: "",
      bibleReference: "",
      studyPlan: "",
      saveAs: "",
      profilePhoto: null,
      topics: []
    });
    setImagePreview(null);
    setValidationErrors({});
    setTopicValidationErrors({});
  };

  // Custom Select Component
  const CustomSelect = ({
    label,
    name,
    value,
    options,
    placeholder
  }: {
    label: string;
    name: string;
    value: string;
    options: string[];
    placeholder: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasError = validationErrors[name];

    return (
      <div className="pb-[15px]">
        <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-[0.85rem] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal cursor-pointer  [&_svg]:stroke-red-500 focus:outline-none   ${
              hasError
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-[#F6805C]"
            } rounded-[8px] border ${hasError ? "border-red-500" : "border-[#AFAFAF]"} bg-[#FFF] text-left flex justify-between items-center`}
          >
            <span className="font-inter">{value || placeholder}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-[#AFAFAF] rounded-[8px] shadow-lg max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <div key={index}>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectChange(name, option);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 text-[#656565] dark:text-gray-100 font-mono text-[14px] transition-colors font-indie"
                  >
                    {option}
                  </button>
                  {index < options.length - 1 && (
                    <div className="border-b border-gray-200 dark:border-gray-600 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-red-500 text-sm mt-1 font-dm-sans">{hasError}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="lg:flex justify-between">
        <h1 className="text-[#794A3A] py-[30px] font-dm-sans text-[18px] font-semibold pt-[15px]">
          {currentStep === 1 ? `Edit Lesson ` : "Edit Topics"}
        </h1>
      </div>

      <div className="bg-[#F9F9F9] dark:bg-gray-900 dark:text-white rounded-[16px] w-full max-w-4xl p-6">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 ? (
            <>
              {/* Thumbnail Upload */}
              <div className="pb-[15px]">
                <label className="text-[#5B5B5B] font-dm-sans text-[16px] font-semibold leading-none pb-[10px] block">
                  Thumbnail
                </label>
                <div className="border-1 border-[#AFAFAF] rounded-[8px] gap-5 bg-[#FFF] dark:bg-gray-800 py-6 mb-4 flex flex-col items-center justify-center relative">
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
                      <Upload className="w-10 h-10 text-[#F6805C] dark:text-gray-300" />
                      <p className="text-[#FFF] font-[600] px-[12px] py-[12px] hover:bg-orange-600 bg-[#F6805C] rounded-[8px] dark:text-white text-[14px] mt-1">
                        Upload Image
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Lesson Name */}
              <div className="pb-[15px]">
                <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                  Lesson Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter Lesson Name"
                  className={`w-full px-4 py-[0.85rem] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal focus:outline-none   ${
                    validationErrors.firstName
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-[#F6805C]"
                  } rounded-[8px] border ${
                    validationErrors.firstName
                      ? "border-red-500"
                      : "border-[#AFAFAF]"
                  } bg-[#FFF]`}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1 font-dm-sans">
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="pb-[15px]">
                <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Text Here"
                  rows={1}
                  className={`w-full px-4 py-[0.85rem] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal focus:outline-none   ${
                    validationErrors.description
                      ? "focus:ring-red-500 border-red-500"
                      : "focus:ring-[#F6805C]"
                  } rounded-[8px] border ${
                    validationErrors.description
                      ? "border-red-500"
                      : "border-[#AFAFAF]"
                  } bg-[#FFF] resize-none`}
                />
                {validationErrors.description && (
                  <p className="text-red-500 text-sm mt-1 font-dm-sans">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Age Group */}
              <CustomSelect
                label="Age Group"
                name="ageGroup"
                value={formData.ageGroup}
                options={ageGroups}
                placeholder="Select Age Group e.g, 25-30"
              />

              {/* Bible Reference */}
              <CustomSelect
                label="Bible Reference"
                name="bibleReference"
                value={formData.bibleReference}
                options={bibleReferences}
                placeholder="Select Bible Reference"
              />

              {/* Study Plan */}
              <CustomSelect
                label="Study Plan"
                name="studyPlan"
                value={formData.studyPlan}
                options={studyPlans}
                placeholder="Select Study Plan (e.g. 7 day)"
              />

              {/* Show topic count preview */}
              {formData.studyPlan &&
                formData.studyPlan !== "Select Study Plan (e.g. 7 day)" && (
                  <div className="pb-[15px]">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-[8px] p-3">
                      <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                        📝 {formData.topics.length} topics will be generated for
                        your {formData.studyPlan}
                      </p>
                    </div>
                  </div>
                )}

              {/* Save As */}
              <div className="pb-[15px]">
                <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                  Save As
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer justify-between">
                    <span className="text-sm text-gray-700">Public</span>
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.saveAs === "public"}
                      onChange={() => handleRadioChange("public")}
                      className="appearance-none w-4 h-4 border-2 border-red-400 rounded-full checked:bg-red-400 checked:border-red-400 transition"
                    />
                  </label>

                  <label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer justify-between">
                    <span className="text-sm text-gray-700">Private</span>
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.saveAs === "private"}
                      onChange={() => handleRadioChange("private")}
                      className="appearance-none w-4 h-4 border-2 border-red-400 rounded-full checked:bg-red-400 checked:border-red-400 transition"
                    />
                  </label>
                </div>
                {validationErrors.saveAs && (
                  <p className="text-red-500 text-sm mt-1 font-dm-sans">
                    {validationErrors.saveAs}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Add Topics */}
              <div className="pb-[15px]">
                {formData.topics.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      Please select a study plan in Step 1 to generate topics
                    </p>
                  </div>
                ) : (
                  formData.topics.map((topic, index) => (
                    <div
                      key={topic.id}
                      className="border border-[#E5E5E5] rounded-[8px] mb-3 border-0  dark:bg-gray-800 overflow-hidden"
                    >
                      {/* Topic Header */}
                      <div 
                       onClick={() => toggleTopicExpansion(topic.id)}
                      className="flex justify-between items-center cursor-pointer  rounded-[8px] p-3  border-1 border-[#AFAFAF] bg-[#FFF] dark:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="text-[#5B5B5B] font-dm-sans text-[12px] font-[600]">
                            Topic {index + 1}
                          </span>
                         
                        </div>
                        <button
  type="button"
  onClick={() => toggleTopicExpansion(topic.id)}
  className="w-8 h-8 flex items-center justify-center text-[#F6805C]  cursor-pointer rounded-full transition-colors"
>
  {topic.isExpanded ? (
    <Minus className="w-4 h-4" />
  ) : (
    <Plus className="w-4 h-4" />
  )}
</button>

                      </div>

                      {/* Topic Content - Only show when expanded */}
                      {topic.isExpanded && (
                        <div className="py-4 space-y-4">
                          {/* Topic Name */}
                          <div>
                            <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                              Topic Name
                            </label>
                            <input
                              type="text"
                              value={topic.topicName}
                              onChange={(e) =>
                                handleTopicChange(
                                  topic.id,
                                  "topicName",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Topic Name"

                                  
                              className={`border-1 border-[#AFAFAF] w-full px-3 py-3 dark:bg-gray-700 dark:text-gray-100 text-[#5B5B5B]  font-normal focus:outline-none rounded-[8px]   ${
                                topicValidationErrors[index]?.topicName
                                  ? "focus:ring-red-500 border-red-500"
                                  : "focus:ring-[#F6805C]"
                              } rounded-[6px] border ${
                                topicValidationErrors[index]?.topicName
                                  ? "border-red-500"
                                  : "border-[#AFAFAF]"
                              } bg-[#FFF] placeholder-[#999999]`}
                            />
                            {topicValidationErrors[index]?.topicName && (
                              <p className="text-red-500 text-sm mt-1 font-dm-sans">
                                {topicValidationErrors[index].topicName}
                              </p>
                            )}
                          </div>

                          {/* Scripture Reference */}
                          <div>
                            <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                              Scripture Reference 
                            </label>
                            <input
                              type="text"
                              value={topic.scriptureReference}
                              onChange={(e) =>
                                handleTopicChange(
                                  topic.id,
                                  "scriptureReference",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Scripture Reference"
                              className={`border-1 border-[#AFAFAF] w-full px-3 py-3 dark:bg-gray-700 dark:text-gray-100 text-[#5B5B5B]  font-normal focus:outline-none rounded-[8px]   ${
                                topicValidationErrors[index]?.scriptureReference
                                  ? "focus:ring-red-500 border-red-500"
                                  : "focus:ring-[#F6805C]"
                              } rounded-[6px] border ${
                                topicValidationErrors[index]?.scriptureReference
                                  ? "border-red-500"
                                  : "border-[#AFAFAF]"
                              } bg-[#FFF] placeholder-[#999999]`}
                            />
                            {topicValidationErrors[index]
                              ?.scriptureReference && (
                              <p className="text-red-500 text-sm mt-1 font-dm-sans">
                                {
                                  topicValidationErrors[index]
                                    .scriptureReference
                                }
                              </p>
                            )}
                          </div>

                          {/* Description */}
                          <div>
                            <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                              Description 
                            </label>
                            <textarea
                              value={topic.description}
                              onChange={(e) =>
                                handleTopicChange(
                                  topic.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Text Here"
                              rows={4}
                              className={`border-1 border-[#AFAFAF] w-full px-3 py-3 dark:bg-gray-700 dark:text-gray-100 text-[#5B5B5B]  font-normal focus:outline-none rounded-[8px]   ${
                                topicValidationErrors[index]?.description
                                  ? "focus:ring-red-500 border-red-500"
                                  : "focus:ring-[#F6805C]"
                              } rounded-[6px] border ${
                                topicValidationErrors[index]?.description
                                  ? "border-red-500"
                                  : "border-[#AFAFAF]"
                              } bg-[#FFF] resize-none placeholder-[#999999]`}
                            />
                            {topicValidationErrors[index]?.description && (
                              <p className="text-red-500 text-sm mt-1 font-dm-sans">
                                {topicValidationErrors[index].description}
                              </p>
                            )}
                          </div>

                          {/* Verse Highlight */}
                          <div>
                            <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                              Verse Highlight 
                            </label>
                            <textarea
                              value={topic.verseHighlight}
                              onChange={(e) =>
                                handleTopicChange(
                                  topic.id,
                                  "verseHighlight",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Text Here"
                              rows={3}
                              className={`border-1 border-[#AFAFAF] w-full px-3 py-3 dark:bg-gray-700 dark:text-gray-100 text-[#5B5B5B]  font-normal focus:outline-none rounded-[8px]   ${
                                topicValidationErrors[index]?.verseHighlight
                                  ? "focus:ring-red-500 border-red-500"
                                  : "focus:ring-[#F6805C]"
                              } rounded-[6px] border ${
                                topicValidationErrors[index]?.verseHighlight
                                  ? "border-red-500"
                                  : "border-[#AFAFAF]"
                              } bg-[#FFF] resize-none placeholder-[#999999]`}
                            />
                            {topicValidationErrors[index]?.verseHighlight && (
                              <p className="text-red-500 text-sm mt-1 font-dm-sans">
                                {topicValidationErrors[index].verseHighlight}
                              </p>
                            )}
                          </div>

                          {/* Reflection Question */}
                          <div>
                            <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-none block pb-[10px]">
                              Reflection Question 
                            </label>
                            <input
                              type="text"
                              value={topic.reflectionQuestion}
                              onChange={(e) =>
                                handleTopicChange(
                                  topic.id,
                                  "reflectionQuestion",
                                  e.target.value
                                )
                              }
                              placeholder="Enter Reflection Question"
                              className={`border-1 border-[#AFAFAF] w-full px-3 py-3 dark:bg-gray-700 dark:text-gray-100 text-[#5B5B5B]  font-normal focus:outline-none rounded-[8px]   ${
                                topicValidationErrors[index]?.reflectionQuestion
                                  ? "focus:ring-red-500 border-red-500"
                                  : "focus:ring-[#F6805C]"
                              } rounded-[6px] border ${
                                topicValidationErrors[index]?.reflectionQuestion
                                  ? "border-red-500"
                                  : "border-[#AFAFAF]"
                              } bg-[#FFF] placeholder-[#999999]`}
                            />
                            {topicValidationErrors[index]
                              ?.reflectionQuestion && (
                              <p className="text-red-500 text-sm mt-1 font-dm-sans">
                                {
                                  topicValidationErrors[index]
                                    .reflectionQuestion
                                }
                              </p>
                            )}
                          </div>

                          {/* Save Topic Button */}
                          <div className="flex justify-end pt-2">
                            <button
                              type="button"
                              onClick={() => saveTopic(index)}
                              className="px-6 py-2 bg-[#F6805C] text-white rounded-[10px] cursor-pointer hover:bg-orange-600 transition-colors font-dm-sans text-[14px] font-medium"
                            >
                              Save Topic
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Form Actions */}
          <div className="block md:flex justify-between pt-4">
            {currentStep === 2 && (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-16 cursor-pointer py-3 mt-2 border border-[#F6805C] text-[#F6805C] rounded-[8px] hover:bg-[#F6805C] hover:text-white transition-colors"
              >
                Previous
              </button>
            )}

            <button
              type="submit"
              className="py-[16px] px-[30px] mt-2  -md:w-full cursor-pointer bg-[#F6805C] text-white rounded-[10px] hover:bg-orange-600 transition-colors ml-auto"
            >
              {currentStep === 1 ? "Next Step" : "Create Lesson"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddLesson;