"use client";

import { useState } from "react";
import Image from "next/image";
interface DayContent {
  title: string;
  reference: string;
  description: string;
  quote: string;
  verse: string;
  reflection: string;
}

const devotionalData: Record<number, DayContent> = {
  1: {
    title: "The Parable of the Lost Sheep",
    reference: "Luke 15:1-7",
    description:
      "A rebellious son leaves his father, wastes everything, then returns home expecting rejection. Instead, the father welcomes him with joy and forgiveness.",
    quote:
      "But while he was still a long way off, his father saw him and was filled with compassion for him.",
    verse: "Luke 15:20",
    reflection:
      "Is there something in your life that you need to return to God with? How does this story reflect God's love for you?"
  },
  2: {
    title: "The Parable of the Good Samaritan",
    reference: "Luke 10:25-37",
    description:
      "A man is beaten and left for dead on the road. Religious leaders pass by, but a Samaritan stops to help, showing true neighborly love.",
    quote:
      "But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him.",
    verse: "Luke 10:33",
    reflection:
      "Who in your life needs your compassion today? How can you be a good neighbor to those around you?"
  },
  3: {
    title: "The Parable of the Sower",
    reference: "Matthew 13:1-23",
    description:
      "A farmer scatters seeds on different types of ground, representing how people receive God's word in various ways and conditions of their hearts.",
    quote:
      "But the seed falling on good soil refers to someone who hears the word and understands it.",
    verse: "Matthew 13:23",
    reflection:
      "What kind of soil is your heart right now? What might be preventing God's word from taking root in your life?"
  },
  4: {
    title: "The Parable of the Mustard Seed",
    reference: "Matthew 13:31-32",
    description:
      "Jesus compares the kingdom of heaven to a tiny mustard seed that grows into a large tree, showing how small beginnings can have great impact.",
    quote:
      "Though it is the smallest of all seeds, yet when it grows, it is the largest of garden plants.",
    verse: "Matthew 13:32",
    reflection:
      "What small act of faith is God calling you to take today? How have you seen small things grow into something significant?"
  },
  5: {
    title: "The Parable of the Talents",
    reference: "Matthew 25:14-30",
    description:
      "A master entrusts his servants with different amounts of money. Those who invest wisely are rewarded, while the one who hides his talent is rebuked.",
    quote:
      "Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things.",
    verse: "Matthew 25:21",
    reflection:
      "What gifts and talents has God given you? How are you using them to serve others and honor Him?"
  },
  6: {
    title: "The Parable of the Wedding Feast",
    reference: "Matthew 22:1-14",
    description:
      "A king prepares a wedding feast, but the invited guests make excuses. The invitation is extended to everyone, showing God's inclusive love.",
    quote:
      "Go to the street corners and invite to the banquet anyone you find.",
    verse: "Matthew 22:9",
    reflection:
      "How do you respond to God's invitation in your daily life? Who in your life needs to hear about God's open invitation?"
  },
  7: {
    title: "The Parable of the Wise and Foolish Builders",
    reference: "Matthew 7:24-27",
    description:
      "Two men build houses - one on rock, one on sand. When storms come, only the house built on solid foundation survives, representing obedience to God's word.",
    quote:
      "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.",
    verse: "Matthew 7:24",
    reflection:
      "What foundation is your life built on? How can you strengthen your spiritual foundation this week?"
  }
};

export default function LessonDetails() {
  const [activeDay, setActiveDay] = useState(1);

  const days = [
    { number: 1, label: "Day 1" },
    { number: 2, label: "Day 2" },
    { number: 3, label: "Day 3" },
    { number: 4, label: "Day 4" },
    { number: 5, label: "Day 5" },
    { number: 6, label: "Day 6" },
    { number: 7, label: "Day 7" }
  ];

  const currentContent = devotionalData[activeDay];

  return (
    <div className="min-h-screen mx-auto bg-white">
      <div className="items-center justify-between pb-6 lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold pt-[15px]">
          The Parables of Jesus
        </h1>

        <div className="items-center gap-4 sm:flex">
          <button className="bg-[#F6805C] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-5 py-[14px] rounded-xl transition mt-[10px] sm:mt-[0px]">
            Edit Lesson
          </button>
        </div>
      </div>
      {/* Day Navigation Tabs */}
      <div className="flex  flex-wrap  bg-[#F9F9F9] rounded-[12px]   p-[10px]">
        {days.map((day) => (
          <button
            key={day.number}
            onClick={() => setActiveDay(day.number)}
            className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg my-2 text-sm font-medium transition-colors ${
              activeDay === day.number
                ? "bg-[#F6805C] text-white"
                : "bg-white rounded-[6px] text-[#F6805C] text-[14px] font-[600]  hover:bg-[#F6805C] hover:text-white cursor-pointer"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="text-[18px] font-[700]  text-[#794A3A] mb-1 pe-1">
            {currentContent.title}
          </h1>
          <p className="text-[#794A3A] text-[14px] font-[500]">
            ( {currentContent.reference} )
          </p>
        </div>

        {/* Description */}
        <div className="bg-[#F9F9F9] rounded-[12px] px-[30px] py-[30px] leading-relaxed">
          <p className="italic text-[#5B5B5B]  text-[14px] font-[400] ">
            {currentContent.description}
          </p>
        </div>

        {/* Quote Section */}

        {/* ############> Start  <########### */}

        <div className="bg-[#F9F9F9] rounded-[12px] px-[30px] py-[30px] leading-relaxed">
          <div className="mr-2 text-2xl leading-normal">
            <Image
              src="/images/massy-image/Quote.svg"
              alt="Avatar"
              width={30}
              height={30}
              className="object-cover rounded-full"
            />
          </div>
          <p className="italic text-[#5B5B5B]  text-[14px] font-[400]">
            {currentContent.quote}
          </p>

          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-[600] leading-normal">
            – {currentContent.verse}
          </p>
        </div>

        {/* ############> End    <###########*/}

        {/* Description */}
        <div className="bg-[#F9F9F9] rounded-[12px] px-[30px] py-[30px] leading-relaxed">
          <h2 className="text-[#794A3A] font-dmsans text-[15.038px] not-italic font-bold leading-normal">
            Reflect & Respond
          </h2>
          <p className="italic text-[#5B5B5B]  text-[14px] font-[400] ">
            {currentContent.reflection}
          </p>
        </div>
      </div>
    </div>
  );
}
