"use client";
import React, { useState } from "react";
import AddNewVerse from "../VerseAndTipsManagement/components/AddNewVerse";
import AddNewTip from "../VerseAndTipsManagement/components/AddNewTip";
import EditVerse from "../VerseAndTipsManagement/components/EditVerse";
import Image from "next/image";
import GenerateGameManually from "./GenerateGameManually/page";
import GenerateGameUsingAIModal from "./components/GenerateGameUsingAIModal";
import { useRouter } from "next/navigation";

const BibleTriviaQuizData = [
  {
    id: 1,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 2,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 3,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 4,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 5,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 6,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 7,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "InActive"
  },
  {
    id: 8,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  },
  {
    id: 9,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/quiz.png",
    status: "Active"
  }
];
const BibleAnswerQuestionData = [
  {
    id: 1,
    heading: "Test Your answer IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 2,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 3,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 4,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 5,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "InActive"
  },
  {
    id: 6,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 7,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 8,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  },
  {
    id: 9,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/ans.png",
    status: "Active"
  }
];
const DailyChallengesData = [
  {
    id: 1,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 2,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 3,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 4,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 5,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 6,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 7,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 8,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  },
  {
    id: 9,
    heading: "Test Your Faith IQ!",
    paragraph: '"For I know the plans I have for you," declares the LORD...',
    image: "/images/challenges.png",
    status: "Active"
  }
];

const TabButton = ({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    className={`px-1 min-w-fit  lg:min-w-56 whitespace-nowrap md:px-2 lg:px-6 xl:px-8 py-2 md:py-3 cursor-pointer text-xs sm:text-sm md:text-xs lg:text-sm rounded-t-xl font-semibold focus:outline-none transition-colors duration-200 ${
      active ? "bg-[#F6805C] text-white" : "bg-transparent text-[#F6805C]"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({
  image,
  heading,
  status,
  paragraph,
  onEdit
}: {
  image: string;
  heading: string;
  status: string;
  paragraph: string;
  onEdit: () => void;
}) => (
  <div className="flex flex-row items-center border border-[#F6805C] rounded-2xl px-2 overflow-hidden sm:px-4 py-3 bg-white min-h-28 w-full">
    {/* Image Section */}
    <div className="flex flex-shrink-0 justify-center items-center w-20 h-20">
      <Image
        src={image}
        alt="card-img"
        width={80}
        height={80}
        className="object-cover w-20 h-20 bg-gray-50 rounded-xl border border-gray-200"
      />
    </div>
    {/* Content Section */}
    <div className="flex flex-col flex-grow px-2 min-w-44">
      <div className="flex justify-between items-center">
        <span className="text-lg  text-[#794A3A]  truncate">{heading}</span>
      </div>
      <div className="text-[#794A3A] text-xs truncate">{paragraph}</div>
      <div className="flex gap-3 mt-1">
        <button
          onClick={onEdit}
          className="px-4 py-1.5 text-sm cursor-pointer rounded-lg bg-[#F6805C] text-white hover:opacity-90 transition"
        >
          Edit
        </button>
        <button className="px-4 py-1.5 text-sm cursor-pointer rounded-lg bg-[#FF2D2D] text-white hover:opacity-90 transition">
          Delete
        </button>
      </div>
    </div>
    {/* Status Section */}
    <div className="flex flex-col justify-between items-end h-full">
      <span
        className="text-xs font-medium"
        style={{ color: status === "Active" ? "#2FFF47" : "#FF2F2F" }}
      >
        {status}
      </span>
    </div>
  </div>
);

const GameManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "bibletriviaquiz" | "dailychallenges" | "bibleanswerquestion"
  >("bibletriviaquiz");
  const [showAddVerse, setShowAddVerse] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);
  const [showEditVerse, setShowEditVerse] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<{
    id: number;
    image: string;
    heading: string;
    status: string;
    paragraph: string;
  } | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showManualPage, setShowManualPage] = useState(false);

  const router = useRouter();

  const handleEditClick = (verse: {
    id: number;
    image: string;
    heading: string;
    status: string;
    paragraph: string;
  }) => {
    setSelectedVerse(verse);
    setShowEditVerse(true);
  };

  // Helper to convert data to Card props
  const mapToCardData = (
    arr: {
      id: number;
      heading: string;
      paragraph: string;
      image: string;
      status: string;
    }[]
  ) =>
    arr.map((item) => ({
      id: item.id,
      image: item.image,
      heading: item.heading,
      status: item.status,
      paragraph: item.paragraph
    }));

  let currentData: {
    id: number;
    image: string;
    heading: string;
    status: string;
    paragraph: string;
  }[] = [];
  if (activeTab === "bibletriviaquiz") {
    currentData = mapToCardData(BibleTriviaQuizData);
  } else if (activeTab === "bibleanswerquestion") {
    currentData = mapToCardData(BibleAnswerQuestionData);
  } else if (activeTab === "dailychallenges") {
    currentData = mapToCardData(DailyChallengesData);
  }

  // If showManualPage, render only the manual page with a back button
  if (showManualPage) {
    return (
      <div className="relative min-h-screen bg-[#FAFAFA]">
        <button
          onClick={() => setShowManualPage(false)}
          className="absolute top-4 left-4 z-10 text-[#F6805C] bg-white border border-[#F6805C] px-4 py-2 rounded-lg font-semibold shadow hover:bg-[#F6805C] hover:text-white transition"
        >
          ← Back
        </button>
        <GenerateGameManually />
      </div>
    );
  }

  return (
    <div className="md:pt-5">
      <div className="flex flex-col justify-between items-start mb-4 sm:items-center md:flex-row">
        <h2 className="flex-wrap text-lg whitespace-nowrap  w-full  font-semibold text-[#794A3A]">
          Games Management
        </h2>
        <div className="flex gap-3 pt-4 sm:pt-0">
          <button
            className="px-3 cursor-pointer md:px-4 xl:px-5 py-2 md:py-3 xl:py-4 whitespace-nowrap rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 transition bg-[#F6805C]"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Game
          </button>
        </div>
      </div>
      <div
        className="flex-wrap gap-1 sm:gap-3 md:gap-2 lg:gap-6"
        style={{
          borderBottom: "1.7px dashed #F6805C",
          borderBottomWidth: "2px",
          borderImage:
            "repeating-linear-gradient(to right, #F6805C 0 8px, transparent 8px 15px) 30",
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem"
        }}
      >
        <TabButton
          active={activeTab === "bibletriviaquiz"}
          onClick={() => setActiveTab("bibletriviaquiz")}
        >
          Bible Trivia Quiz
        </TabButton>
        <TabButton
          active={activeTab === "bibleanswerquestion"}
          onClick={() => setActiveTab("bibleanswerquestion")}
        >
          Bible Answer Question
        </TabButton>
        <TabButton
          active={activeTab === "dailychallenges"}
          onClick={() => setActiveTab("dailychallenges")}
        >
          Daily Challenges
        </TabButton>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {currentData.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            heading={item.heading}
            status={item.status}
            paragraph={item.paragraph}
            onEdit={() => handleEditClick(item)}
          />
        ))}
      </div>
      {showAddVerse && <AddNewVerse onClose={() => setShowAddVerse(false)} />}
      {showAddTip && <AddNewTip onClose={() => setShowAddTip(false)} />}
      {showEditVerse && selectedVerse && (
        <EditVerse
          onClose={() => setShowEditVerse(false)}
          initialData={{
            id: selectedVerse.id,
            badge: selectedVerse.heading,
            text: selectedVerse.paragraph
          }}
        />
      )}

      {/* Modal for choosing AI/manual generation */}
      {isModalOpen && !showAIModal && !showManualPage && (
        <div className="flex fixed inset-0 z-50 justify-center items-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsModalOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative bg-[#F9F9F9] rounded-[20px] md:px-8 py-8 max-w-md w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
            >
              <span className="w-7 h-7 text-[#F6805C] cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out">
                ✕
              </span>
            </button>
            {/* Modal Body */}
            <div className="space-y-4 p-[20px]">
              {/* AI Generation Button */}
              <button
                onClick={() => {
                  setShowAIModal(true);
                }}
                className="w-full bg-[#6AC8C4] hover:bg-teal-600 text-white text-[18px] cursor-pointer font-[500] py-4 px-6 rounded-[12px] transition-colors"
              >
                Generate Game Using AI
              </button>
              {/* Manual Generation Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  router.push("/GameManagement/GenerateGameManually");
                }}
                className="w-full bg-[#F6805C] cursor-pointer hover:bg-orange-600 text-white text-[18px] font-[500] py-4 px-6 rounded-[12px] transition-colors"
              >
                Generate Game Manually
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Show AI Modal */}
      {showAIModal && (
        <GenerateGameUsingAIModal
          onClose={() => {
            setShowAIModal(false);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default GameManagement;
