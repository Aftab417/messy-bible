"use client";
import React, { useState } from "react";
import AddNewVerse from "../VerseAndTipsManagement/components/AddNewVerse";
import AddNewTip from "../VerseAndTipsManagement/components/AddNewTip";
import EditVerse from "../VerseAndTipsManagement/components/EditVerse";
import Image from "next/image";

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
    className={`px-5 md:px-6 xl:px-8 py-2 md:py-3 cursor-pointer text-sm rounded-t-xl font-semibold focus:outline-none transition-colors duration-200 ${
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
  <div className="flex flex-row items-center border border-[#F6805C] rounded-2xl px-4 py-3 bg-white min-h-28 w-full">
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

  return (
    <div className="md:pt-5">
      <div className="flex flex-col justify-between items-start mb-4 sm:items-center md:flex-row">
        <h2 className="flex-wrap text-lg whitespace-nowrap  w-full  font-semibold text-[#794A3A]">
          Games Management
        </h2>
        <div className="flex gap-3 pt-4 sm:pt-0">
          <button
            className="px-3 cursor-pointer md:px-4 xl:px-5 py-2 md:py-3 xl:py-4 whitespace-nowrap rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 transition bg-[#F6805C]"
            onClick={() => setShowAddVerse(true)}
          >
            + Add New Game
          </button>
        </div>
      </div>
      <div
        style={{
          borderBottom: "1.7px dashed #F6805C",
          borderBottomWidth: "2px",
          borderImage:
            "repeating-linear-gradient(to right, #F6805C 0 8px, transparent 8px 15px) 30",
          width: "100%",
          display: "flex",
          gap: "24px",
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
    </div>
  );
};

export default GameManagement;
