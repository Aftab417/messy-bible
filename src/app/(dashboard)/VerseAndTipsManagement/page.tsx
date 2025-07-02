"use client";
import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import AddNewVerse from "./components/AddNewVerse";
import AddNewTip from "./components/AddNewTip";
import EditVerse from "./components/EditVerse";
import EditTip from "./components/EditTip ";

const verses = [
  {
    id: 1,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 2,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 3,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 4,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 5,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 6,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 7,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 8,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  },
  {
    id: 9,
    badge: "Have a blessed day",
    text: '"For I know the plans I have for you," declares the LORD...'
  }
];

const tips = [
  {
    id: 1,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 2,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 3,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 4,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 5,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 6,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 7,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 8,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
  },
  {
    id: 9,
    text: "Begin your day with a short prayer and a calm meditation session. These few peaceful moments can fill you with gratitude, clarity, and positive energy.",
    date: "7/02/2025"
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
  badge,
  text,
  onEdit
}: {
  badge: string;
  text: string;
  onEdit: () => void;
}) => (
  <div className="bg-[#F9F9F9] rounded-xl  p-2 relative min-h-28 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <span className="inline-block text-base w-fit bg-[#F6805C] text-white  font-normal  px-3 py-1 font-indie rounded-xl mb-2">
        {badge}!
      </span>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="w-6 h-6 flex cursor-pointer items-center justify-center rounded-sm bg-[#F6805C] hover:bg-[#e96a4a] transition"
          title="Edit"
        >
          <GoPencil className="font-semibold text-white" />
        </button>
        <button
          className="w-6 h-6 cursor-pointer flex items-center justify-center rounded-sm bg-[#FF2D2D] hover:bg-[#d91c1c] transition"
          title="Delete"
        >
          <RiDeleteBin6Fill className="font-semibold text-white" />
        </button>
      </div>
    </div>
    <div className=" text-[#5B5B5B] font-indie text-lg ">{text}</div>
  </div>
);

const TipsCard = ({
  text,
  date,
  onEdit
}: {
  text: string;
  date: string;
  onEdit: () => void;
}) => (
  <div className="bg-[#F9F9F9] rounded-xl  p-2 relative min-h-28    flex flex-col  justify-between">
    <div className="text-[#6B6B6B] text-base font-indie  pb-2 pt-4">{text}</div>
    <div className="flex justify-between items-center mt-auto">
      <span className="text-[#656565] text-sm font-normal">{date}</span>
      <div className="flex gap-2">
        <button
          className="w-6 h-6 cursor-pointer flex items-center justify-center rounded-sm bg-[#F6805C] hover:bg-[#e96a4a] transition"
          onClick={onEdit}
          title="Edit"
        >
          <GoPencil className="font-semibold text-white" />
        </button>
        <button
          className="w-6 h-6 flex cursor-pointer items-center justify-center rounded-sm bg-[#FF2D2D] hover:bg-[#d91c1c] transition"
          title="Delete"
        >
          <RiDeleteBin6Fill className="font-semibold text-white" />
        </button>
      </div>
    </div>
  </div>
);

const VerseAndTipsManagement = () => {
  const [activeTab, setActiveTab] = useState<"verse" | "tip">("verse");
  const [showAddVerse, setShowAddVerse] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);
  const [showEditVerse, setShowEditVerse] = useState(false);
  const [showEditTip, setShowEditTip] = useState(false);

  const [selectedVerse, setSelectedVerse] = useState<{
    id: number;
    badge: string;
    text: string;
  } | null>(null);
  const [selectedTip, setSelectedTip] = useState<{
    id: number;
    text: string;
    date: string;
  } | null>(null);

  const handleEditClick = (verse: {
    id: number;
    badge: string;
    text: string;
  }) => {
    setSelectedVerse(verse);
    setShowEditVerse(true);
  };
  const handleEditTipClick = (tip: {
    id: number;
    text: string;
    date: string;
  }) => {
    setSelectedTip(tip);
    setShowEditTip(true);
  };
  return (
    <div className="md:pt-5">
      <div className="flex flex-col justify-between items-start mb-4 sm:items-center md:flex-row">
        <h2 className="flex-wrap text-lg whitespace-nowrap  w-full  font-semibold text-[#794A3A]">
          Verse & Tips Management
        </h2>
        <div className="flex gap-3 pt-4 sm:pt-0">
          <button
            className="px-3 md:px-4 cursor-pointer xl:px-5 py-2 md:py-3 xl:py-4 whitespace-nowrap rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 transition bg-[#6AC8C4]"
            onClick={() => setShowAddTip(true)}
          >
            + Add New Tip
          </button>
          <button
            className="px-3 cursor-pointer md:px-4 xl:px-5 py-2 md:py-3 xl:py-4 whitespace-nowrap rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 transition bg-[#F6805C]"
            onClick={() => setShowAddVerse(true)}
          >
            + Add New Verse
          </button>
        </div>
      </div>
      <div
        style={{
          borderBottom: "1.7px dashed #F6805C", // fallback for old browsers
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
          active={activeTab === "verse"}
          onClick={() => setActiveTab("verse")}
        >
          Daily Verse
        </TabButton>
        <TabButton
          active={activeTab === "tip"}
          onClick={() => setActiveTab("tip")}
        >
          Daily Tips
        </TabButton>
      </div>
      <div className="grid grid-cols-1 gap-8 pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {activeTab === "verse"
          ? verses.map((item) => (
              <Card
                key={item.id}
                badge={item.badge}
                text={item.text}
                onEdit={() => handleEditClick(item)}
              />
            ))
          : tips.map((item) => (
              <TipsCard
                key={item.id}
                text={item.text}
                date={item.date}
                onEdit={() => handleEditTipClick(item)}
              />
            ))}
      </div>
      {showAddVerse && <AddNewVerse onClose={() => setShowAddVerse(false)} />}
      {showAddTip && <AddNewTip onClose={() => setShowAddTip(false)} />}
      {showEditVerse && selectedVerse && (
        <EditVerse
          onClose={() => setShowEditVerse(false)}
          initialData={selectedVerse}
        />
      )}

      {showEditTip && selectedTip && (
        <EditTip
          onClose={() => setShowEditTip(false)}
          initialData={selectedTip}
        />
      )}
    </div>
  );
};

export default VerseAndTipsManagement;
