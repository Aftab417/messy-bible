import Image from "next/image";
import React from "react";

import Barchart1 from "./Components/Home/Barchart1";
import SubscriptionChart from "./Components/Home/SubscriptionChart";
import AreaChartComponent from "./Components/Home/AreaChartComponent";

// Static data types

const StatCard = ({
  title,
  value,
  image
}: {
  title: string;
  value: number;
  image: string;
}) => (
  <div className="p-3 md:p-6 bg-[#F9F9F9]  rounded-[12px] border border-[#AFAFAF]">
    <div className="flex items-center">
      <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full">
        <Image
          src={image}
          alt="Bar Graph"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          width={30}
          height={30}
        />
      </div>
      <div className="pl-[10px]">
        <h3 className="text-[#794A3A] font-dm-sans text-sm font-semibold">
          {title}
        </h3>
        <p className="text-[#794A3A] font-inter text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const counts = {
    users: 1200,
    dentists: 111,
    smiles: 1100,
    totalgame: 59
  };

  const statsData = [
    {
      title: "Total Users",
      value: counts.users,
      image: "/images/massy-image/totaluser.svg"
    },
    {
      title: "Total Sermons",
      value: counts.smiles,
      image: "/images/massy-image/totalsermon.svg"
    },
    {
      title: "Total Lessons",
      value: counts.dentists,
      image: "/images/massy-image/totallesson.svg"
    },
    {
      title: "Total Games",
      value: counts.totalgame,
      image: "/images/massy-image/totalgame.svg"
    }
  ];

  return (
    <>
      <h1 className="pb-[15px] text-[#794A3A] font-dm-sans text-[32px] font-semibold">
        Hello, Jelly young
      </h1>
      <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            image={stat.image}
          />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <Barchart1 />
        </div>

        <div className="">
          <SubscriptionChart />
        </div>
      </div>

      <AreaChartComponent />
    </>
  );
};

export default Home;
