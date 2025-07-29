"use client";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";

import { useRouter } from "next/navigation"; // Note: 'next/navigation' not 'next/router'

const dummyUsers = [
  {
    _id: "1",
    lessonName: "Emma Johnson",
    Createby: "User: Touseef",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2023-05-15T08:23:12.000Z"
  },
  {
    _id: "2",
    lessonName: "Liam Smith",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2023-04-22T14:45:00.000Z"
  },
  {
    _id: "3",
    lessonName: "Olivia Brown",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "Manually",
    createdAt: "2023-03-10T09:12:33.000Z"
  },
  {
    _id: "4",
    lessonName: "Noah Wilson",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2023-02-28T16:30:45.000Z"
  },
  {
    _id: "5",
    lessonName: "Ava Taylor",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2023-01-15T11:05:21.000Z"
  },
  {
    _id: "6",
    lessonName: "William Anderson",
    Createby: "User: Touseef",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2022-12-05T07:45:10.000Z"
  },
  {
    _id: "7",
    lessonName: "Sophia Martinez",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "Manually",
    createdAt: "2022-11-20T13:22:54.000Z"
  },
  {
    _id: "8",
    lessonName: "Benjamin Thomas",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2022-10-10T10:15:30.000Z"
  },
  {
    _id: "9",
    lessonName: "Isabella Garcia",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2022-09-01T18:40:15.000Z"
  },
  {
    _id: "10",
    lessonName: "James Rodriguez",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2022-08-12T09:30:45.000Z"
  },
  {
    _id: "11",
    lessonName: "Mia Lee",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2022-07-25T14:20:33.000Z"
  },
  {
    _id: "12",
    lessonName: "Elijah Perez",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2022-06-30T11:10:22.000Z"
  },
  {
    _id: "13",
    lessonName: "Charlotte Hall",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2022-05-18T16:45:19.000Z"
  },
  {
    _id: "14",
    lessonName: "Lucas Young",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2022-04-05T08:30:40.000Z"
  },
  {
    _id: "15",
    lessonName: "Amelia Allen",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "Manually",
    createdAt: "2022-03-12T12:15:25.000Z"
  },
  {
    _id: "16",
    lessonName: "Mason King",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2022-02-28T09:50:10.000Z"
  },
  {
    _id: "17",
    lessonName: "Harper Wright",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2022-01-15T14:25:05.000Z"
  },
  {
    _id: "18",
    lessonName: "Ethan Scott",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2021-12-10T17:40:30.000Z"
  },
  {
    _id: "19",
    lessonName: "Evelyn Green",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2021-11-05T10:15:20.000Z"
  },
  {
    _id: "20",
    lessonName: "Alexander Baker",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2021-10-01T13:30:15.000Z"
  },
  {
    _id: "21",
    lessonName: "Abigail Adams",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2021-09-15T08:45:40.000Z"
  },
  {
    _id: "22",
    lessonName: "Michael Nelson",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2021-08-20T11:20:25.000Z"
  },
  {
    _id: "23",
    lessonName: "Emily Carter",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2021-07-10T15:35:10.000Z"
  },
  {
    _id: "24",
    lessonName: "Daniel Mitchell",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2021-06-05T09:10:45.000Z"
  },
  {
    _id: "25",
    lessonName: "Elizabeth Roberts",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2021-05-01T12:25:30.000Z"
  },
  {
    _id: "26",
    lessonName: "Matthew Turner",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2021-04-15T16:50:15.000Z"
  },
  {
    _id: "27",
    lessonName: "Sofia Phillips",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2021-03-10T10:15:40.000Z"
  },
  {
    _id: "28",
    lessonName: "Andrew Campbell",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2021-02-05T13:40:25.000Z"
  },
  {
    _id: "29",
    lessonName: "Avery Parker",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "Manually",
    createdAt: "2021-01-01T17:05:10.000Z"
  },
  {
    _id: "30",
    lessonName: "David Evans",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2020-12-15T09:30:45.000Z"
  },
  {
    _id: "31",
    lessonName: "Scarlett Edwards",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2020-11-10T12:55:30.000Z"
  },
  {
    _id: "32",
    lessonName: "Joseph Collins",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2020-10-05T16:20:15.000Z"
  },
  {
    _id: "33",
    lessonName: "Victoria Stewart",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2020-09-01T10:45:40.000Z"
  },
  {
    _id: "34",
    lessonName: "Jackson Sanchez",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2020-08-15T14:10:25.000Z"
  },
  {
    _id: "35",
    lessonName: "Madison Morris",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2020-07-10T17:35:10.000Z"
  },
  {
    _id: "36",
    lessonName: "Samuel Rogers",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2020-06-05T11:00:45.000Z"
  },
  {
    _id: "37",
    lessonName: "Luna Reed",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2020-05-01T14:25:30.000Z"
  },
  {
    _id: "38",
    lessonName: "Sebastian Cook",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2020-04-15T17:50:15.000Z"
  },
  {
    _id: "39",
    lessonName: "Chloe Morgan",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2020-03-10T10:15:40.000Z"
  },
  {
    _id: "40",
    lessonName: "Henry Bell",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2020-02-05T13:40:25.000Z"
  },
  {
    _id: "41",
    lessonName: "Penelope Murphy",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "Manually",
    createdAt: "2020-01-01T17:05:10.000Z"
  },
  {
    _id: "42",
    lessonName: "Owen Bailey",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2019-12-15T09:30:45.000Z"
  },
  {
    _id: "43",
    lessonName: "Layla Rivera",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2019-11-10T12:55:30.000Z"
  },
  {
    _id: "44",
    lessonName: "Gabriel Cooper",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2019-10-05T16:20:15.000Z"
  },
  {
    _id: "45",
    lessonName: "Zoey Richardson",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2019-09-01T10:45:40.000Z"
  },
  {
    _id: "46",
    lessonName: "Carter Cox",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "AI",
    createdAt: "2019-08-15T14:10:25.000Z"
  },
  {
    _id: "47",
    lessonName: "Nora Howard",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2019-07-10T17:35:10.000Z"
  },
  {
    _id: "48",
    lessonName: "Jayden Ward",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2019-06-05T11:00:45.000Z"
  },
  {
    _id: "49",
    lessonName: "Hannah Torres",
    Createby: "admin",
    StudyPlan: "7 Day Plan",
    Visibility: "Private",
    LessonType: "AI",
    createdAt: "2019-05-01T14:25:30.000Z"
  },
  {
    _id: "50",
    lessonName: "Luke Peterson",
    Createby: "admin",
    StudyPlan: "30 Day Plan",
    Visibility: "Public",
    LessonType: "Manually",
    createdAt: "2019-04-15T17:50:15.000Z"
  }
];

const UserManagement = () => {
  const [aiMatching, setAiMatching] = useState(true);

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  //#############> Yup Star<############### t
  //#############> Yup End <###############
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete user");
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const showEllipsis = totalPages > 6;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i
                ? "bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]"
                : "text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white"
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]"
              : "text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white"
          }`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i
                ? "bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]"
                : "text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white"
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]"
              : "text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white"
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Createby.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.StudyPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Visibility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const router = useRouter();

  const handleClick = () => {
    router.push("/LessonManagement/LessonDetails"); // Now this will work correctly
  };

  interface Lesson {
    _id: string;
    lessonName: string;
    Createby: string;
    StudyPlan: string;
    Visibility: string;
    LessonType: string;
    createdAt: string;
  }

  const handleEdit = (lesson: Lesson) => {
    if (lesson.LessonType === "AI") {
      setFormData({
        lessonName: lesson.lessonName,
        description: "",
        ageGroup: "",
        bibleReference: "",
        studyPlan: lesson.StudyPlan,
        visibility: lesson.Visibility.toLowerCase()
      }); // preload form data
      setIsAIModalOpen(true); // open modal
    } else if (lesson.LessonType === "Manually") {
      router.push("/LessonManagement/EditLesson");
    }
  };

  // const  handleAdd= () => {
  //   router.push("/LessonManagement/AddLesson"); // Now this will work correctly
  // };

  const handleGenerateAI = () => {
    closeModal(); // Close the first modal
    setIsAIModalOpen(true); // Open the AI Lesson modal
  };

  //##############> Modal start <################
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleGenerateManually = () => {
    router.push("/LessonManagement/AddLesson");
    closeModal();
  };

  // Handle form input changes

  const [formData, setFormData] = useState({
    lessonName: "",
    description: "",
    ageGroup: "",
    bibleReference: "",
    studyPlan: "",
    visibility: "private"
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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

    // Handle radio button changes

    return (
      <div className="pb-[15px]">
        <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-normal block pb-[10px]">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-[0.85rem]  rounded-[8px] border border-[#AFAFAF]   bg-[#FFF] text-left flex justify-between items-center text-[#656565] font-normal cursor-pointer  [&_svg]:stroke-red-500 focus:outline-none   ${
           "
          >
            <span className="font-inter">{value || placeholder}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white  border border-[#AFAFAF] rounded-[8px] shadow-lg max-h-48 overflow-y-auto">
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
                    <div className="mx-2 border-b border-gray-200 "></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  //##############> Modal End  <################
  return (
    <>
      <div className="items-center justify-between lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold">
          Lesson Management
        </h1>

        <div className="items-center gap-4 sm:flex">
          <div className="flex items-center bg-[#F5F5F5] border border-gray-200 rounded-[12px] px-[18px] py-[12px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search Lesson"
              className="w-full text-sm text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.444 12.5541 16.0012 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23191 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99476 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00281 10.7997 3.49478 11.9874C3.98675 13.1752 4.81987 14.1903 5.88879 14.9046C6.95771 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#505050"
              />
            </svg>
          </div>

          <button
            //  onClick={handleAdd}
            onClick={openModal}
            className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[6px] w-full sm:w-[160px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px]"
          >
            + Add New Lesson
          </button>
        </div>
      </div>

      <div className="py-[20px] text-[#794A3A] font-dm-sans text-[16px] font-semibold">
        All Lessons
      </div>

      <div className="w-full overflow-x-auto -ms-4">
        <table className="w-full overflow-hidden border-separate shadow border-spacing-x-4">
          <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
            <tr>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                S.No:
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Lesson Name
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Created By
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Study Plan
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Visibility
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Lesson Type
              </th>
              <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-3 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, i) => (
                <tr key={user._id} className="border-b border-[#DEE2E6]/50 ">
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {String(
                      (currentPage - 1) * ITEMS_PER_PAGE + i + 1
                    ).padStart(2, "0")}
                  </td>
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {user.lessonName}
                  </td>
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {user.Createby}
                  </td>
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {user.StudyPlan}
                  </td>
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {user.Visibility}
                  </td>

                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {user.LessonType}
                  </td>
                  <td className="flex justify-center p-3 text-sm">
                    <button
                      className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                      onClick={handleClick}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="20" rx="3" fill="#6AC8C4" />
                        <path
                          d="M10 8C9.42135 8 8.86639 8.21071 8.45722 8.58579C8.04805 8.96086 7.81818 9.46957 7.81818 10C7.81818 10.5304 8.04805 11.0391 8.45722 11.4142C8.86639 11.7893 9.42135 12 10 12C10.5787 12 11.1336 11.7893 11.5428 11.4142C11.9519 11.0391 12.1818 10.5304 12.1818 10C12.1818 9.46957 11.9519 8.96086 11.5428 8.58579C11.1336 8.21071 10.5787 8 10 8ZM10 13.3333C9.03558 13.3333 8.11065 12.9821 7.4287 12.357C6.74675 11.7319 6.36364 10.8841 6.36364 10C6.36364 9.11595 6.74675 8.2681 7.4287 7.64298C8.11065 7.01786 9.03558 6.66667 10 6.66667C10.9644 6.66667 11.8893 7.01786 12.5713 7.64298C13.2532 8.2681 13.6364 9.11595 13.6364 10C13.6364 10.8841 13.2532 11.7319 12.5713 12.357C11.8893 12.9821 10.9644 13.3333 10 13.3333ZM10 5C6.36364 5 3.25818 7.07333 2 10C3.25818 12.9267 6.36364 15 10 15C13.6364 15 16.7418 12.9267 18 10C16.7418 7.07333 13.6364 5 10 5Z"
                          fill="white"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleEdit(user as Lesson)}
                      className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="20" rx="3" fill="#F6805C" />
                        <path
                          d="M5.33333 14.6667H6.28333L12.8 8.15L11.85 7.2L5.33333 13.7167V14.6667ZM4.66667 16C4.47778 16 4.31956 15.936 4.192 15.808C4.06444 15.68 4.00044 15.5218 4 15.3333V13.7167C4 13.5389 4.03333 13.3693 4.1 13.208C4.16667 13.0467 4.26111 12.9051 4.38333 12.7833L12.8 4.38333C12.9333 4.26111 13.0807 4.16667 13.242 4.1C13.4033 4.03333 13.5727 4 13.75 4C13.9273 4 14.0996 4.03333 14.2667 4.1C14.4338 4.16667 14.5782 4.26667 14.7 4.4L15.6167 5.33333C15.75 5.45556 15.8471 5.6 15.908 5.76667C15.9689 5.93333 15.9996 6.1 16 6.26667C16 6.44444 15.9693 6.614 15.908 6.77533C15.8467 6.93667 15.7496 7.08378 15.6167 7.21667L7.21667 15.6167C7.09444 15.7389 6.95267 15.8333 6.79133 15.9C6.63 15.9667 6.46067 16 6.28333 16H4.66667ZM12.3167 7.68333L11.85 7.2L12.8 8.15L12.3167 7.68333Z"
                          fill="white"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="20" rx="3" fill="#FF1919" />
                        <path
                          d="M6.875 16C6.53125 16 6.23708 15.8696 5.9925 15.6087C5.74792 15.3478 5.62542 15.0338 5.625 14.6667V6H5V4.66667H8.125V4H11.875V4.66667H15V6H14.375V14.6667C14.375 15.0333 14.2527 15.3473 14.0081 15.6087C13.7635 15.87 13.4692 16.0004 13.125 16H6.875ZM8.125 13.3333H9.375V7.33333H8.125V13.3333ZM10.625 13.3333H11.875V7.33333H10.625V13.3333Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* Pagination */}
          </tbody>
        </table>
      </div>

      <div className="flex bg-[#F9F9F9] mt-4 items-center justify-end gap-1 text-sm px-[20px] py-[12px] ">
        <button
          className="flex items-center py-[6px] px-[16px] border border-[#AFAFAF] rounded-[8px] hover:bg-[#F6805C] hover:border-[#F6805C] cursor-pointer hover:text-white text-[#5B5B5B]"
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="flex items-center py-[6px] px-[16px] border border-[#AFAFAF] rounded-[8px] hover:bg-[#F6805C] hover:border-[#F6805C] cursor-pointer hover:text-white text-[#5B5B5B]"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        {renderPaginationButtons()}
        <button
          className="flex items-center py-[6px] px-[16px] border border-[#AFAFAF] rounded-[8px] hover:bg-[#F6805C] hover:border-[#F6805C] cursor-pointer hover:text-white text-[#5B5B5B]"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="flex items-center py-[6px] px-[16px] border border-[#AFAFAF] rounded-[8px] hover:bg-[#F6805C] hover:border-[#F6805C] cursor-pointer hover:text-white text-[#5B5B5B]"
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      {/* Modal Start Start */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative bg-[#F9F9F9] rounded-[20px]   md:px-8 py-8 max-w-md w-full mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
            >
              <X className="w-7 h-7 text-[#F6805C]  cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out" />
            </button>

            {/* Modal Body */}
            <div className="space-y-4 p-[20px]">
              {/* AI Generation Button */}
              <button
                onClick={handleGenerateAI}
                className="w-full bg-[#6AC8C4]  hover:bg-teal-600 text-white text-[18px] cursor-pointer font-[500] py-4 px-6 rounded-[12px] transition-colors"
              >
                Generate Lesson Using AI
              </button>

              {/* Manual Generation Button */}
              <button
                onClick={handleGenerateManually}
                className="w-full bg-[#F6805C] cursor-pointer hover:bg-orange-600 text-white text-[18px] font-[500] py-4 px-6 rounded-[12px] transition-colors"
              >
                Generate Lesson Manually
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Start End */}

      {/*##################> Second Modal Start<################  */}
      {isAIModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsAIModalOpen(false)}
          />

          <div className="relative bg-white rounded-[20px] w-full max-w-md mx-4 overflow-hidden">
            <div
              className="p-6 overflow-y-auto max-h-[80vh] 
              [&::-webkit-scrollbar]:w-1 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:bg-gray-300 
              [&::-webkit-scrollbar-track]:bg-gray-100"
            >
              {/* Close Button */}

              {/* Form Header */}
              <h2 className=" text-[20px] font-[500] leading-normal text-[#794A3A] Fredoka text-center mb-8">
                + AI Lesson Regeneration
              </h2>

              {/* Form Body */}
              <form className="space-y-4">
                <div>
                  <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-normal block pb-[10px]">
                    Image Generation
                  </label>
                  <div className="flex items-center justify-between  bg-white      w-full px-4 py-[0.85rem]   border-1 border-[#AFAFAF] rounded-[8px]  text-[#656565] font-normal focus:outline-none">
                    <span className="text-[#656565]  w-[70%] font-inter text-sm not-italic font-normal leading-normal capitalize">
                      Do you want to generate an image?
                    </span>
                    <div
                      onClick={() => toggle(setAiMatching)}
                      className={`w-12  h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        aiMatching ? "bg-[#F6805C]" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          aiMatching ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Lesson Name */}
                <div className="pb-[15px]">
                  <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-normal block pb-[10px]">
                    Lesson Name
                  </label>
                  <input
                    type="text"
                    name="lessonName"
                    value={formData.lessonName}
                    onChange={handleInputChange}
                    placeholder="Enter Lesson Name"
                    className="w-full px-4 py-[0.85rem] border-1 border-[#AFAFAF] rounded-[8px] text-[#656565] font-normal focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div className="pb-[15px]">
                  <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-normal block pb-[10px]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Text Here"
                    rows={3}
                    className="w-full px-4 py-[0.85rem]  border-1 border-[#AFAFAF] rounded-[8px]  text-[#656565] font-normal focus:outline-none"
                  />
                </div>

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
                  placeholder="Select Bible Reference e.g., Galatians 5:22"
                />

                {/* Study Plan */}
                <CustomSelect
                  label="Study Plan"
                  name="studyPlan"
                  value={formData.studyPlan}
                  options={studyPlans}
                  placeholder="Select Study Plan (e.g. 7 day)"
                />

                {/* Save As */}
                <div className="pb-[15px]">
                  <label className="text-[#794A3A] font-dm-sans text-[16px] font-medium leading-normal block pb-[10px]">
                    Save As
                  </label>

                  <div className="grid gap-4">
                    <label className="flex items-center gap-2 p-4  border-1 border-[#AFAFAF] text-[#656565]  rounded-lg cursor-pointer justify-between">
                      <span className="text-[#656565] text-[14px] font-[400] ">
                        Public
                      </span>
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        className="w-4 h-4 transition border-2 border-red-400 rounded-full appearance-none checked:bg-red-400 checked:border-red-400"
                      />
                    </label>

                    <label className="flex items-center gap-2 p-4 border-1 border-[#AFAFAF] rounded-lg cursor-pointer justify-between">
                      <span className="text-[#656565] text-[14px] font-[400]">
                        Private
                      </span>
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        className="w-4 h-4 transition border-2 border-red-400 rounded-full appearance-none checked:bg-red-400 checked:border-red-400"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsAIModalOpen(false)}
                    className="bg-transparent text-[14px] font-[600]    py-3 rounded-[10px] px-[10px]  border-1 border-[#F6805C] text-[#F6805C]  hover:bg-[#F6805C]  hover:text-white  cursor-pointer "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="hover:bg-transparent text-[14px] font-[600]    py-3 rounded-[10px] px-[10]  border-1 hover:border-[#F6805C] hover:text-[#F6805C] bg-[#F6805C]  text-white  cursor-pointer"
                  >
                    Regenerate Lesson
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*##################> Second Modal  End <################ */}
    </>
  );
};

export default UserManagement;
