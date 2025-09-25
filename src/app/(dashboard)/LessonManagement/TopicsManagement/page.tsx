"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface Topic {
  id: number;
  topicName: string;
  scriptureReference: string;
  description: string;
  verseHighlight: string;
  reflectionQuestion: string;
  isExpanded: boolean;
  isSaved: boolean;
}

// interface TopicsManagementProps {
//   lessonId?: string;
//   lessonName?: string;
//   onBack?: () => void;
// }

// Validation schema for topics
const topicSchema = Yup.object().shape({
  topicName: Yup.string().required("Topic name is required"),
  scriptureReference: Yup.string().required("Scripture reference is required"),
  description: Yup.string().required("Description is required"),
  verseHighlight: Yup.string().required("Verse highlight is required"),
  reflectionQuestion: Yup.string().required("Reflection question is required")
});

const TopicsManagement = () => {
  const lessonName = "Lesson Topics";
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonNameFromUrl = searchParams.get('lessonName');
  const studyPlanFromUrl = searchParams.get('studyPlan');
  
  // Use lesson name from URL if available, otherwise use prop
  const displayLessonName = lessonNameFromUrl || lessonName;
  
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      topicName: "",
      scriptureReference: "",
      description: "",
      verseHighlight: "",
      reflectionQuestion: "",
      isExpanded: true,
      isSaved: false
    }
  ]);

  // const [nextTopicId, setNextTopicId] = useState(2);
  const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({});

  // Generate topics based on study plan
  const generateTopicsForPlan = (planType: string) => {
    let numberOfTopics = 0;

    switch (planType) {
      case "7-day":
      case "7 Day Plan":
        numberOfTopics = 7;
        break;
      case "30-day":
      case "30 Day Plan":
        numberOfTopics = 30;
        break;
      default:
        numberOfTopics = 7; // Default to 7 topics
    }

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

  // Initialize topics based on study plan from URL
  useEffect(() => {
    if (studyPlanFromUrl) {
      const generatedTopics = generateTopicsForPlan(studyPlanFromUrl);
      setTopics(generatedTopics);
      // setNextTopicId(generatedTopics.length + 1);
    } else if (topics.length === 1) {
      // Fallback to 7 topics if no study plan provided
      const initialTopics = Array.from({ length: 6 }, (_, index) => ({
        id: index + 2,
        topicName: "",
        scriptureReference: "",
        description: "",
        verseHighlight: "",
        reflectionQuestion: "",
        isExpanded: false,
        isSaved: false
      }));
      setTopics(prev => [...prev, ...initialTopics]);
      // setNextTopicId(8);
    }
  }, [studyPlanFromUrl, topics.length]);

  // const addNewTopic = () => {
  //   const newTopic: Topic = {
  //     id: nextTopicId,
  //     topicName: "",
  //     scriptureReference: "",
  //     description: "",
  //     verseHighlight: "",
  //     reflectionQuestion: "",
  //     isExpanded: true,
  //     isSaved: false
  //   };
  //   
  //   setTopics(prev => [...prev, newTopic]);
  //   setNextTopicId(prev => prev + 1);
  //   toast.success("New topic added!");
  // };

  const toggleTopicExpansion = (topicId: number) => {
    setTopics(prev => 
      prev.map(topic => 
        topic.id === topicId 
          ? { ...topic, isExpanded: !topic.isExpanded }
          : topic
      )
    );
  };

  const updateTopic = (topicId: number, field: keyof Topic, value: string) => {
    setTopics(prev =>
      prev.map(topic =>
        topic.id === topicId
          ? { ...topic, [field]: value, isSaved: false }
          : topic
      )
    );

    // Clear validation error for this field
    const topicIndex = topics.findIndex(t => t.id === topicId);
    if (validationErrors[topicIndex]?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [topicIndex]: {
          ...prev[topicIndex],
          [field]: ""
        }
      }));
    }
  };

  const validateTopic = async (topicIndex: number) => {
    try {
      const topic = topics[topicIndex];
      await topicSchema.validate(topic, { abortEarly: false });

      // Clear errors for this topic
      setValidationErrors(prev => ({
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

        setValidationErrors(prev => ({
          ...prev,
          [topicIndex]: errors
        }));

        // Show first error as toast
        const firstError = error.inner[0]?.message;
        if (firstError) {
          toast.error(`Topic ${topicIndex + 1}: ${firstError}`);
        }
      }
      return false;
    }
  };

  const saveTopic = async (topicId: number) => {
    const topicIndex = topics.findIndex(t => t.id === topicId);
    const isValid = await validateTopic(topicIndex);

    if (!isValid) return;

    setTopics(prev =>
      prev.map(topic =>
        topic.id === topicId
          ? { ...topic, isSaved: true, isExpanded: false }
          : topic
      )
    );

    toast.success(`Topic ${topicIndex + 1} saved successfully!`);
  };

  const handleCreateLesson = () => {
    const savedTopics = topics.filter(topic => topic.isSaved);
    
    if (savedTopics.length === 0) {
      toast.error("Please save at least one topic before creating the lesson");
      return;
    }

    toast.success("Lesson created successfully!");
    
    router.push("/LessonManagement");
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="justify-between w-full lg:flex mb-4 sm:mb-6">
          <div>
            <h1 className="text-[#794A3A] py-[20px] sm:py-[30px] font-dm-sans text-[16px] sm:text-[18px] font-semibold pt-[10px] sm:pt-[15px]">
              Add Topics
            </h1>
            {displayLessonName && displayLessonName !== "Lesson Topics" && (
              <p className="text-[#5B5B5B] font-dm-sans text-[14px] -mt-2 mb-1">
                for &quot;{displayLessonName}&quot;
              </p>
            )}
            {studyPlanFromUrl && (
              <p className="text-[#F6805C] font-dm-sans text-[12px] -mt-1 mb-2 font-medium">
                {studyPlanFromUrl === "7-day" ? "7 Day Plan" : studyPlanFromUrl === "30-day" ? "30 Day Plan" : studyPlanFromUrl} - {topics.length} topics
              </p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#F9F9F9] rounded-[12px] sm:rounded-[16px] w-full max-w-7xl p-3 sm:p-4 md:p-6">
          <div className="space-y-3 sm:space-y-4">
            {topics.map((topic, index) => (
              <div
                key={topic.id}
                className={`border-[#E5E5E5] rounded-[8px] mb-3 overflow-hidden ${
                  topic.isExpanded ? 'bg-white' : 'bg-white'
                }`}
              >
                {/* Topic Header */}
                <div
                  onClick={() => toggleTopicExpansion(topic.id)}
                  className="flex justify-between items-center cursor-pointer rounded-[6px] sm:rounded-[8px] p-2 sm:p-3 border-1 border-[#AFAFAF] bg-[#FFF] hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#5B5B5B] font-dm-sans text-[11px] sm:text-[12px] font-[600]">
                      Topic {index + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopicExpansion(topic.id);
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[#F6805C] cursor-pointer rounded-full transition-colors hover:bg-orange-50"
                  >
                    {topic.isExpanded ? (
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>

                {/* Topic Content - Only show when expanded */}
                {topic.isExpanded && (
                  <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 bg-white">
                    {/* Topic Name */}
                    <div>
                      <label className="text-[#794A3A] font-dm-sans text-[14px] sm:text-[16px] font-medium leading-none block pb-[8px] sm:pb-[10px]">
                        Topic Name
                      </label>
                      <input
                        type="text"
                        value={topic.topicName}
                        onChange={(e) => updateTopic(topic.id, 'topicName', e.target.value)}
                        placeholder="Enter Topic Name"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[#5B5B5B] font-normal focus:outline-none rounded-[6px] sm:rounded-[8px] border ${
                          validationErrors[index]?.topicName
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-[#F6805C] border-[#AFAFAF]"
                        } bg-[#FFF] placeholder-[#5B5B5B] text-sm sm:text-base`}
                      />
                      {validationErrors[index]?.topicName && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 font-dm-sans">
                          {validationErrors[index].topicName}
                        </p>
                      )}
                    </div>

                    {/* Scripture Reference */}
                    <div>
                      <label className="text-[#794A3A] font-dm-sans text-[14px] sm:text-[16px] font-medium leading-none block pb-[8px] sm:pb-[10px]">
                        Scripture Reference
                      </label>
                      <input
                        type="text"
                        value={topic.scriptureReference}
                        onChange={(e) => updateTopic(topic.id, 'scriptureReference', e.target.value)}
                        placeholder="Enter Scripture Reference"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[#5B5B5B] font-normal focus:outline-none rounded-[6px] sm:rounded-[8px] border ${
                          validationErrors[index]?.scriptureReference
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-[#F6805C] border-[#AFAFAF]"
                        } bg-[#FFF] placeholder-[#5B5B5B] text-sm sm:text-base`}
                      />
                      {validationErrors[index]?.scriptureReference && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 font-dm-sans">
                          {validationErrors[index].scriptureReference}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-[#794A3A] font-dm-sans text-[14px] sm:text-[16px] font-medium leading-none block pb-[8px] sm:pb-[10px]">
                        Description
                      </label>
                      <textarea
                        value={topic.description}
                        onChange={(e) => updateTopic(topic.id, 'description', e.target.value)}
                        placeholder="Enter Text Here"
                        rows={3}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[#5B5B5B] font-normal focus:outline-none rounded-[6px] sm:rounded-[8px] border ${
                          validationErrors[index]?.description
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-[#F6805C] border-[#AFAFAF]"
                        } bg-[#FFF] resize-none placeholder-[#5B5B5B] text-sm sm:text-base`}
                      />
                      {validationErrors[index]?.description && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 font-dm-sans">
                          {validationErrors[index].description}
                        </p>
                      )}
                    </div>

                    {/* Verse Highlight */}
                    <div>
                      <label className="text-[#794A3A] font-dm-sans text-[14px] sm:text-[16px] font-medium leading-none block pb-[8px] sm:pb-[10px]">
                        Verse Highlight
                      </label>
                      <textarea
                        value={topic.verseHighlight}
                        onChange={(e) => updateTopic(topic.id, 'verseHighlight', e.target.value)}
                        placeholder="Enter Text Here"
                        rows={2}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[#5B5B5B] font-normal focus:outline-none rounded-[6px] sm:rounded-[8px] border ${
                          validationErrors[index]?.verseHighlight
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-[#F6805C] border-[#AFAFAF]"
                        } bg-[#FFF] resize-none placeholder-[#5B5B5B] text-sm sm:text-base`}
                      />
                      {validationErrors[index]?.verseHighlight && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 font-dm-sans">
                          {validationErrors[index].verseHighlight}
                        </p>
                      )}
                    </div>

                    {/* Reflection Question */}
                    <div>
                      <label className="text-[#794A3A] font-dm-sans text-[14px] sm:text-[16px] font-medium leading-none block pb-[8px] sm:pb-[10px]">
                        Reflection Question
                      </label>
                      <input
                        type="text"
                        value={topic.reflectionQuestion}
                        onChange={(e) => updateTopic(topic.id, 'reflectionQuestion', e.target.value)}
                        placeholder="Enter Reflection Question"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-[#5B5B5B] font-normal focus:outline-none rounded-[6px] sm:rounded-[8px] border ${
                          validationErrors[index]?.reflectionQuestion
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-[#F6805C] border-[#AFAFAF]"
                        } bg-[#FFF] placeholder-[#5B5B5B] text-sm sm:text-base`}
                      />
                      {validationErrors[index]?.reflectionQuestion && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 font-dm-sans">
                          {validationErrors[index].reflectionQuestion}
                        </p>
                      )}
                    </div>

                    {/* Save Topic Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => saveTopic(topic.id)}
                        className="px-4 sm:px-6 py-2 bg-[#F6805C] text-white rounded-[8px] sm:rounded-[10px] cursor-pointer hover:bg-orange-600 transition-colors font-dm-sans text-[12px] sm:text-[14px] font-medium"
                      >
                        Save Topic
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Create Lesson Button */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-end">
          <button
            onClick={handleCreateLesson}
            className="py-2 sm:py-3 px-8 sm:px-12 md:px-14 bg-gray-600 text-white rounded-[8px] sm:rounded-[10px] hover:bg-gray-700 transition-colors font-dm-sans text-[12px] sm:text-[14px] font-medium"
          >
            Create Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicsManagement;
