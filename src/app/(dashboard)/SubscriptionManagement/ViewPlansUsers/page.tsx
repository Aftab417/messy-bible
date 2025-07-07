"use client";
import React from "react";

interface UserPlan {
  _id: string;
  userName: string;
  planName: string;
  startDate: string;
  amount: number;
  status: "active" | "inactive" | "pending" | "cancelled";
}

const dummyUserPlans: UserPlan[] = [
  {
    _id: "1",
    userName: "John Doe",
    planName: "Freemium",
    startDate: "2024-05-01",
    amount: 0,
    status: "active"
  },
  {
    _id: "2",
    userName: "Jane Smith",
    planName: "Premium",
    startDate: "2024-04-15",
    amount: 99,
    status: "inactive"
  },
  {
    _id: "3",
    userName: "Alice Johnson",
    planName: "Family",
    startDate: "2024-03-20",
    amount: 149,
    status: "pending"
  },
  {
    _id: "4",
    userName: "Bob Brown",
    planName: "Annual",
    startDate: "2024-01-10",
    amount: 199,
    status: "cancelled"
  },
  {
    _id: "5",
    userName: "Charlie Green",
    planName: "Premium",
    startDate: "2024-06-05",
    amount: 99,
    status: "active"
  },
  {
    _id: "6",
    userName: "Diana Prince",
    planName: "Freemium",
    startDate: "2024-06-10",
    amount: 0,
    status: "inactive"
  },
  {
    _id: "7",
    userName: "Ethan Hunt",
    planName: "Family",
    startDate: "2024-02-28",
    amount: 149,
    status: "active"
  },
  {
    _id: "8",
    userName: "Fiona Gallagher",
    planName: "Annual",
    startDate: "2023-12-01",
    amount: 199,
    status: "cancelled"
  },
  {
    _id: "9",
    userName: "George Martin",
    planName: "Premium",
    startDate: "2024-03-12",
    amount: 99,
    status: "pending"
  },
  {
    _id: "10",
    userName: "Hannah Baker",
    planName: "Family",
    startDate: "2024-05-18",
    amount: 149,
    status: "active"
  },
  {
    _id: "11",
    userName: "Ian Wright",
    planName: "Freemium",
    startDate: "2024-04-07",
    amount: 0,
    status: "inactive"
  },
  {
    _id: "12",
    userName: "Julia Roberts",
    planName: "Annual",
    startDate: "2024-01-25",
    amount: 199,
    status: "pending"
  },
  {
    _id: "13",
    userName: "Kevin Hart",
    planName: "Premium",
    startDate: "2024-06-20",
    amount: 99,
    status: "active"
  },
  {
    _id: "14",
    userName: "Laura Palmer",
    planName: "Family",
    startDate: "2024-02-10",
    amount: 149,
    status: "cancelled"
  }
];

export default function User() {
  const [userPlans] = React.useState<UserPlan[]>(dummyUserPlans);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(userPlans.length / ITEMS_PER_PAGE);
  const paginatedUserPlans = userPlans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  return (
    <div className="overflow-x-auto w-full">
      <h1 className="text-[#794A3A] font-dm-sans text-lg font-semibold pt-7">
        Freemium
      </h1>
      <h1 className="text-[#794A3A] font-dm-sans text-base font-semibold py-5">
        All Active User
      </h1>
      <table className="min-w-[700px] w-full overflow-hidden shadow border-separate border-spacing-x-4">
        <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
          <tr>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              S.No:
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              User Name
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              Plan Name
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              Start Date
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              Amount
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              Status
            </th>
            <th className="p-[5px] border-b border-[#505050] text-start w-fit">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="dark:bg-gray-900">
          {paginatedUserPlans.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            paginatedUserPlans.map((plan, i) => (
              <tr key={plan._id} className="border-b border-[#DEE2E6]/50 ">
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                  {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                </td>
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                  {plan.userName}
                </td>
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                  {plan.planName}
                </td>
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                  {plan.startDate}
                </td>
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                  ${plan.amount}
                </td>
                <td className="p-[8px] border-b-1 border-[#F9F9F9] text-[#5B5B5B] capitalize">
                  {plan.status}
                </td>
                <td className="flex justify-start p-3">
                  <button
                    // onClick={() => handleDelete(subscription._id)}
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
          <tr className="w-full bg-[#F9F9F9] ">
            <td colSpan={7}>
              <div className="flex items-center justify-end gap-1 text-sm px-[20px] py-[12px]">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
