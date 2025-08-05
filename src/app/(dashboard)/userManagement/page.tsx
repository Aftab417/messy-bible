"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Select from "react-select";
import { CSSObjectWithLabel, OptionProps } from "react-select";

const dummyUsers = [
  {
    _id: "01",
    username: "Emma Johnson",
    email: "emma.johnson@example.com",
    CurrentPlan: "Yearly",
    createdAt: "2023-05-15T08:23:12.000Z",
    is_active: true
  },
  {
    _id: "02",
    username: "Liam Smith",
    email: "liam.smith@example.org",
    CurrentPlan: "Monthly",
    createdAt: "2023-04-22T14:45:00.000Z",
    is_active: true
  },
  {
    _id: "03",
    username: "Olivia Brown",
    email: "olivia.brown@example.net",
    CurrentPlan: "Free",
    createdAt: "2023-03-10T09:12:33.000Z",
    is_active: false
  },
  {
    _id: "04",
    username: "Noah Wilson",
    email: "noah.wilson@example.io",
    CurrentPlan: "Free",
    createdAt: "2023-02-28T16:30:45.000Z",
    is_active: true
  },
  {
    _id: "05",
    username: "Ava Taylor",
    email: "ava.taylor@example.co",
    CurrentPlan: "Yearly",
    createdAt: "2023-01-15T11:05:21.000Z",
    is_active: true
  },
  {
    _id: "06",
    username: "William Anderson",
    email: "william.anderson@example.me",
    CurrentPlan: "Monthly",
    createdAt: "2022-12-05T07:45:10.000Z",
    is_active: false
  },
  {
    _id: "07",
    username: "Sophia Martinez",
    email: "sophia.martinez@example.us",
    CurrentPlan: "Free",
    createdAt: "2022-11-20T13:22:54.000Z",
    is_active: true
  },
  {
    _id: "08",
    username: "Benjamin Thomas",
    email: "benjamin.thomas@example.biz",
    CurrentPlan: "Yearly",
    createdAt: "2022-10-10T10:15:30.000Z",
    is_active: true
  },
  {
    _id: "09",
    username: "Isabella Garcia",
    email: "isabella.garcia@example.info",
    CurrentPlan: "Free",
    createdAt: "2022-09-01T18:40:15.000Z",
    is_active: false
  },
  {
    _id: "10",
    username: "James Rodriguez",
    email: "james.rodriguez@example.xyz",
    CurrentPlan: "Monthly",
    createdAt: "2022-08-12T09:30:45.000Z",
    is_active: true
  },
  {
    _id: "11",
    username: "Mia Lee",
    email: "mia.lee@example.tech",
    CurrentPlan: "Free",
    createdAt: "2022-07-25T14:20:33.000Z",
    is_active: true
  },
  {
    _id: "12",
    username: "Elijah Perez",
    email: "elijah.perez@example.cloud",
    CurrentPlan: "Yearly",
    createdAt: "2022-06-30T11:10:22.000Z",
    is_active: false
  },
  {
    _id: "13",
    username: "Charlotte Hall",
    email: "charlotte.hall@example.ai",
    CurrentPlan: "Monthly",
    createdAt: "2022-05-18T16:45:19.000Z",
    is_active: true
  },
  {
    _id: "14",
    username: "Lucas Young",
    email: "lucas.young@example.digital",
    CurrentPlan: "Free",
    createdAt: "2022-04-05T08:30:40.000Z",
    is_active: true
  },
  {
    _id: "15",
    username: "Amelia Allen",
    email: "amelia.allen@example.media",
    CurrentPlan: "Free",
    createdAt: "2022-03-12T12:15:25.000Z",
    is_active: false
  },
  {
    _id: "16",
    username: "Mason King",
    email: "mason.king@example.solutions",
    CurrentPlan: "Yearly",
    createdAt: "2022-02-28T09:50:10.000Z",
    is_active: true
  },
  {
    _id: "17",
    username: "Harper Wright",
    email: "harper.wright@example.consulting",
    CurrentPlan: "Monthly",
    createdAt: "2022-01-15T14:25:05.000Z",
    is_active: true
  },
  {
    _id: "18",
    username: "Ethan Scott",
    email: "ethan.scott@example.ventures",
    CurrentPlan: "Free",
    createdAt: "2021-12-10T17:40:30.000Z",
    is_active: false
  },
  {
    _id: "19",
    username: "Evelyn Green",
    email: "evelyn.green@example.group",
    CurrentPlan: "Free",
    createdAt: "2021-11-05T10:15:20.000Z",
    is_active: true
  },
  {
    _id: "20",
    username: "Alexander Baker",
    email: "alexander.baker@example.holdings",
    CurrentPlan: "Yearly",
    createdAt: "2021-10-01T13:30:15.000Z",
    is_active: true
  },
  {
    _id: "21",
    username: "Abigail Adams",
    email: "abigail.adams@example.partners",
    CurrentPlan: "Monthly",
    createdAt: "2021-09-15T08:45:40.000Z",
    is_active: false
  },
  {
    _id: "22",
    username: "Michael Nelson",
    email: "michael.nelson@example.Frees",
    CurrentPlan: "Free",
    createdAt: "2021-08-20T11:20:25.000Z",
    is_active: true
  },
  {
    _id: "23",
    username: "Emily Carter",
    email: "emily.carter@example.industries",
    CurrentPlan: "Yearly",
    createdAt: "2021-07-10T15:35:10.000Z",
    is_active: true
  },
  {
    _id: "24",
    username: "Daniel Mitchell",
    email: "daniel.mitchell@example.systems",
    CurrentPlan: "Free",
    createdAt: "2021-06-05T09:10:45.000Z",
    is_active: false
  },
  {
    _id: "25",
    username: "Elizabeth Roberts",
    email: "elizabeth.roberts@example.technology",
    CurrentPlan: "Monthly",
    createdAt: "2021-05-01T12:25:30.000Z",
    is_active: true
  },
  {
    _id: "26",
    username: "Matthew Turner",
    email: "matthew.turner@example.design",
    CurrentPlan: "Free",
    createdAt: "2021-04-15T16:50:15.000Z",
    is_active: true
  },
  {
    _id: "27",
    username: "Sofia Phillips",
    email: "sofia.phillips@example.agency",
    CurrentPlan: "Yearly",
    createdAt: "2021-03-10T10:15:40.000Z",
    is_active: false
  },
  {
    _id: "28",
    username: "Andrew Campbell",
    email: "andrew.campbell@example.consultants",
    CurrentPlan: "Monthly",
    createdAt: "2021-02-05T13:40:25.000Z",
    is_active: true
  },
  {
    _id: "29",
    username: "Avery Parker",
    email: "avery.parker@example.management",
    CurrentPlan: "Free",
    createdAt: "2021-01-01T17:05:10.000Z",
    is_active: true
  },
  {
    _id: "30",
    username: "David Evans",
    email: "david.evans@example.associates",
    CurrentPlan: "Free",
    createdAt: "2020-12-15T09:30:45.000Z",
    is_active: false
  },
  {
    _id: "31",
    username: "Scarlett Edwards",
    email: "scarlett.edwards@example.creative",
    CurrentPlan: "Yearly",
    createdAt: "2020-11-10T12:55:30.000Z",
    is_active: true
  },
  {
    _id: "32",
    username: "Joseph Collins",
    email: "joseph.collins@example.studio",
    CurrentPlan: "Monthly",
    createdAt: "2020-10-05T16:20:15.000Z",
    is_active: true
  },
  {
    _id: "33",
    username: "Victoria Stewart",
    email: "victoria.stewart@example.labs",
    CurrentPlan: "Free",
    createdAt: "2020-09-01T10:45:40.000Z",
    is_active: false
  },
  {
    _id: "34",
    username: "Jackson Sanchez",
    email: "jackson.sanchez@example.works",
    CurrentPlan: "Free",
    createdAt: "2020-08-15T14:10:25.000Z",
    is_active: true
  },
  {
    _id: "35",
    username: "Madison Morris",
    email: "madison.morris@example.ventures",
    CurrentPlan: "Yearly",
    createdAt: "2020-07-10T17:35:10.000Z",
    is_active: true
  },
  {
    _id: "36",
    username: "Samuel Rogers",
    email: "samuel.rogers@example.capital",
    CurrentPlan: "Monthly",
    createdAt: "2020-06-05T11:00:45.000Z",
    is_active: false
  },
  {
    _id: "37",
    username: "Luna Reed",
    email: "luna.reed@example.partners",
    CurrentPlan: "Free",
    createdAt: "2020-05-01T14:25:30.000Z",
    is_active: true
  },
  {
    _id: "38",
    username: "Sebastian Cook",
    email: "sebastian.cook@example.group",
    CurrentPlan: "Yearly",
    createdAt: "2020-04-15T17:50:15.000Z",
    is_active: true
  },
  {
    _id: "39",
    username: "Chloe Morgan",
    email: "chloe.morgan@example.holdings",
    CurrentPlan: "Free",
    createdAt: "2020-03-10T10:15:40.000Z",
    is_active: false
  },
  {
    _id: "40",
    username: "Henry Bell",
    email: "henry.bell@example.solutions",
    CurrentPlan: "Monthly",
    createdAt: "2020-02-05T13:40:25.000Z",
    is_active: true
  },
  {
    _id: "41",
    username: "Penelope Murphy",
    email: "penelope.murphy@example.digital",
    CurrentPlan: "Free",
    createdAt: "2020-01-01T17:05:10.000Z",
    is_active: true
  },
  {
    _id: "42",
    username: "Owen Bailey",
    email: "owen.bailey@example.media",
    CurrentPlan: "Yearly",
    createdAt: "2019-12-15T09:30:45.000Z",
    is_active: false
  },
  {
    _id: "43",
    username: "Layla Rivera",
    email: "layla.rivera@example.tech",
    CurrentPlan: "Monthly",
    createdAt: "2019-11-10T12:55:30.000Z",
    is_active: true
  },
  {
    _id: "44",
    username: "Gabriel Cooper",
    email: "gabriel.cooper@example.cloud",
    CurrentPlan: "Free",
    createdAt: "2019-10-05T16:20:15.000Z",
    is_active: true
  },
  {
    _id: "45",
    username: "Zoey Richardson",
    email: "zoey.richardson@example.ai",
    CurrentPlan: "Free",
    createdAt: "2019-09-01T10:45:40.000Z",
    is_active: false
  },
  {
    _id: "46",
    username: "Carter Cox",
    email: "carter.cox@example.io",
    CurrentPlan: "Yearly",
    createdAt: "2019-08-15T14:10:25.000Z",
    is_active: true
  },
  {
    _id: "47",
    username: "Nora Howard",
    email: "nora.howard@example.co",
    CurrentPlan: "Monthly",
    createdAt: "2019-07-10T17:35:10.000Z",
    is_active: true
  },
  {
    _id: "48",
    username: "Jayden Ward",
    email: "jayden.ward@example.me",
    CurrentPlan: "Free",
    createdAt: "2019-06-05T11:00:45.000Z",
    is_active: false
  },
  {
    _id: "49",
    username: "Hannah Torres",
    email: "hannah.torres@example.us",
    CurrentPlan: "Free",
    createdAt: "2019-05-01T14:25:30.000Z",
    is_active: true
  },
  {
    _id: "50",
    username: "Luke Peterson",
    email: "luke.peterson@example.org",
    CurrentPlan: "Yearly",
    createdAt: "2019-04-15T17:50:15.000Z",
    is_active: true
  }
];

type StatusOption = {
  value: "active" | "inactive";
  label: string;
};

const statusOptions: StatusOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];

const customStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    minHeight: "auto",
    cursor: "pointer"
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
    fontWeight: "500"
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: "0",
    color: "white",
    "&:hover": {
      color: "white"
    }
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: "4px",
    overflow: "hidden",
    zIndex: 9999 // Ensure dropdown appears above other elements
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<StatusOption, false>
  ) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#F3F4F6" : "white",
    color: "#1F2937",
    "&:hover": {
      backgroundColor: "#F6805C",
      cursor: "pointer"
    }
  })
};

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        confirmButtonColor: "#FA865F",
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

  const handleStatusChange = (id: string, value: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, is_active: value === "active" } : user
      )
    );
  };

  const getBgClass = (isActive: boolean) => {
    return isActive ? "bg-[#FA865F] text-white" : "bg-[#F9C661]  text-white";
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
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.CurrentPlan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExportCSV = () => {
    try {
      const headers = [
        "ID",
        "Username",
        "Email",
        "Current Plan",
        "Status",
        "Created At"
      ];
      const csvContent = [
        headers.join(","),
        ...filteredUsers.map((user) =>
          [
            user._id,
            `"${user.username.replace(/"/g, '""')}"`,
            user.email,
            user.CurrentPlan,
            user.is_active ? "Active" : "Inactive",
            user.createdAt
          ].join(",")
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `users_export_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV export completed!");
    } catch (error) {
      console.error("CSV export failed", error);
      toast.error("Failed to export CSV");
    }
  };

  const handleExportPDF = () => {
    toast("PDF export not implemented yet");
  };

  const router = useRouter();

  const handleClick = () => {
    router.push("/userManagement/UserDetails");
  };

  return (
    <>
      <div className="items-center justify-between lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold">
          Users Management
        </h1>

        <div className="items-center gap-4 sm:flex">
          <div className="flex items-center bg-[#F5F5F5] border border-gray-200 rounded-[12px] px-[18px] py-[12px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search User"
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

          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[18px] w-full sm:w-[150px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px] flex items-center justify-between"
            >
              <span>Export Data</span>
              <span className="ml-2">
                {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-44 ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleExportCSV();
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Export Data CSV
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleExportPDF();
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Export Data PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-[20px] text-[#794A3A] font-dm-sans text-[16px] font-semibold">
        All Users
      </div>

      {/* Table Container with extra bottom padding for dropdown space */}
      <div className="w-full overflow-x-auto -ms-4 pb-20">
        <table className="w-full overflow-hidden border-separate border-spacing-x-4">
          <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
            <tr>
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  S.No:
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "43px" }}
                  ></div>
                </div>
              </th>
              {/* <th className="p-[5px] border-b border-[#505050] text-center w-fit">
                S.No:
              </th> */}
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  User Name
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "160px" }}
                  ></div>
                </div>
              </th>
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  Email
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "220px" }}
                  ></div>
                </div>
              </th>
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  Current Plan
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "130px" }}
                  ></div>
                </div>
              </th>
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  Status
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "130px" }}
                  ></div>
                </div>
              </th>
              <th className="p-[5px] text-center w-fit relative">
                <div className="relative inline-block pb-2">
                  Actions
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b border-[#505050]"
                    style={{ width: "102px" }}
                  ></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, i) => {
                // Determine if this is one of the last two rows
                const isLastTwoRows = i >= paginatedUsers.length - 2;

                return (
                  <tr key={user._id} className="border-b border-[#DEE2E6]/50 ">
                    <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                      {String(
                        (currentPage - 1) * ITEMS_PER_PAGE + i + 1
                      ).padStart(2, "0")}
                    </td>

                    <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                      {user.username}
                    </td>
                    <td className="p-[5px] text-center  text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                      {user.email}
                    </td>
                    <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                      {user.CurrentPlan}
                    </td>

                    <td
                      className={`p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]`}
                    >
                      <div
                        className={`${getBgClass(user.is_active)} rounded-md w-fit px-2 mx-auto`}
                      >
                        <Select
                          options={statusOptions}
                          value={
                            user.is_active ? statusOptions[0] : statusOptions[1]
                          }
                          onChange={(selectedOption) => {
                            if (selectedOption) {
                              handleStatusChange(
                                user._id,
                                selectedOption.value
                              );
                            }
                          }}
                          styles={customStyles}
                          isSearchable={false}
                          menuPlacement={isLastTwoRows ? "top" : "auto"} // Force upward placement for last two rows
                          className="py-2 min-w-24 react-select-container"
                          classNamePrefix="react-select"
                          components={{
                            IndicatorSeparator: null
                          }}
                        />
                      </div>
                    </td>

                    <td className="flex justify-center p-3 border-b-1 border-[#F9F9F9]">
                      <button
                        className="mx-1 text-sm transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination with increased top margin */}
      <div className="flex bg-[#F9F9F9] mt-8 items-center justify-end gap-1 text-sm px-[20px] py-[12px] ">
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
    </>
  );
};
export default UserManagement;
