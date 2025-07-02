"use client";
import Image from "next/image";
 
import React, { useState } from "react";
 
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
  value: string;
  image: string;
}) => (
  <div className="p-3 md:p-5 bg-[#F9F9F9] dark:bg-gray-900 rounded-[12px] border border-[#AFAFAF]">
  
  <div className="flex items-center ">
   <div className=" w-[50px] h-[50px] rounded-[50px] bg-white relative ">
     
    
       <Image src={image} alt="Bar Graph"  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width={20} height={20} />
      
    </div>
   <div className="pl-[10px]">
     <h3 className="text-[#794A3A] font-dm-sans text-base font-semibold">{title}</h3>
     <p className="text-[#794A3A] font-inter text-xl font-bold">{value}</p>
   </div>
   </div>
   
  </div>
);

const Home: React.FC = () => {




  const [counts] = useState({
    users: 1200,
    dentists:111,
    smiles: 1100,
    totalgame:59,

  });

  const statsData = [
    {
      title: "Total Users",
      value: counts.users.toLocaleString(),
      image: "/images/massy-image/totaluser.svg"
    },
    {
      title: "Total Sermons",
      value: counts.smiles.toLocaleString(),
      image: "/images/massy-image/totalsermon.svg"
    },
    {
      title: "Total Lessons",
      value: counts.dentists.toLocaleString(),
      image: "/images/massy-image/TotalLesson.svg"
    },
    {
      title: "Total Games",
      value: counts.totalgame.toLocaleString(),
      image: "/images/massy-image/totalgame.svg"
    }
  ];

 



 

  return (
    <>

    <h1 className="pt-[30px] pb-[15px] text-[#794A3A] font-dm-sans text-[32px] font-semibold">Hello, Jelly young</h1>
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            image={stat.image}
          />
        ))}
      </div>

 

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full">
    <div className="col-span-1 lg:col-span-2 ">
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
