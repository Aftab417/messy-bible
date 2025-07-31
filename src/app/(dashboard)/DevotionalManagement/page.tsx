"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Select from "react-select";
import { CSSObjectWithLabel, OptionProps } from "react-select";
const dummyDevotionals = [
  {
    _id: "1",
    title: "Morning Blessings",
    scripture: "Psalm 5:3",
    status: true,
    createdAt: "2023-05-15T08:23:12.000Z"
  },
  {
    _id: "2",
    title: "Strength for Today",
    scripture: "Isaiah 40:31",
    status: true,
    createdAt: "2023-04-22T14:45:00.000Z"
  },
  {
    _id: "3",
    title: "Peace in Storm",
    scripture: "Mark 4:39",
    status: false,
    createdAt: "2023-03-10T09:12:33.000Z"
  },
  {
    _id: "4",
    title: "God's Provision",
    scripture: "Philippians 4:19",
    status: true,
    createdAt: "2023-02-28T16:30:45.000Z"
  },
  {
    _id: "5",
    title: "Faith Journey",
    scripture: "Hebrews 11:1",
    status: true,
    createdAt: "2023-01-15T11:05:21.000Z"
  },
  {
    _id: "6",
    title: "Love Overflowing",
    scripture: "1 Corinthians 13:4",
    status: false,
    createdAt: "2022-12-05T07:45:10.000Z"
  },
  {
    _id: "7",
    title: "Hope in Darkness",
    scripture: "Romans 15:13",
    status: true,
    createdAt: "2022-11-20T13:22:54.000Z"
  },
  {
    _id: "8",
    title: "Grace Abounds",
    scripture: "2 Corinthians 12:9",
    status: true,
    createdAt: "2022-10-10T10:15:30.000Z"
  },
  {
    _id: "9",
    title: "Joy Unspeakable",
    scripture: "1 Peter 1:8",
    status: false,
    createdAt: "2022-09-01T18:40:15.000Z"
  },
  {
    _id: "10",
    title: "Wisdom for Living",
    scripture: "James 1:5",
    status: true,
    createdAt: "2022-08-12T09:30:45.000Z"
  },
  {
    _id: "11",
    title: "God's Protection",
    scripture: "Psalm 91:4",
    status: true,
    createdAt: "2022-07-25T14:20:33.000Z"
  },
  {
    _id: "12",
    title: "New Mercies",
    scripture: "Lamentations 3:22-23",
    status: false,
    createdAt: "2022-06-30T11:10:22.000Z"
  },
  {
    _id: "13",
    title: "Walking in Light",
    scripture: "1 John 1:7",
    status: true,
    createdAt: "2022-05-18T16:45:19.000Z"
  },
  {
    _id: "14",
    title: "Perfect Peace",
    scripture: "Isaiah 26:3",
    status: true,
    createdAt: "2022-04-05T08:30:40.000Z"
  },
  {
    _id: "15",
    title: "Unshakable Faith",
    scripture: "Hebrews 12:2",
    status: false,
    createdAt: "2022-03-12T12:15:25.000Z"
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

const DevotionalManagement = () => {
  const [devotionals, setDevotionals] = useState(dummyDevotionals);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

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
      overflow: "hidden"
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
        setDevotionals((prev) =>
          prev.filter((devotional) => devotional._id !== id)
        );
        toast.success("Devotional deleted successfully!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete devotional");
    }
  };

  const handleStatusChange = (id: string, value: "active" | "inactive") => {
    setDevotionals((prevDevotionals) =>
      prevDevotionals.map((devotional) =>
        devotional._id === id
          ? { ...devotional, status: value === "active" }
          : devotional
      )
    );
  };

  const getBgClass = (isActive: boolean) => {
    return isActive ? "bg-[#FA865F] text-white" : "bg-[#F9C661] text-white";
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

  // Filter devotionals based on search term
  const filteredDevotionals = devotionals.filter(
    (devotional) =>
      devotional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devotional.scripture.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDevotionals.length / ITEMS_PER_PAGE);
  const paginatedDevotionals = filteredDevotionals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const router = useRouter();

  const Detailspage = () => {
    router.push("/DevotionalManagement/DetailDevotion");
  };

  const handleAddNew = () => {
    router.push("/DevotionalManagement/AddDevotion");
  };

  const EditDevotion = () => {
    router.push("/DevotionalManagement/EditDevotion");
  };

  return (
    <>
      <div className="items-center justify-between lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold ">
          Devotional Management
        </h1>

        <div className="items-center gap-4 sm:flex">
          <div className="flex items-center bg-[#F5F5F5] rounded-[12px] px-[18px] py-[14px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search Devotional"
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
            onClick={handleAddNew}
            className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[18px] w-full sm:w-[200px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px]"
          >
            + Add New Devotional
          </button>
        </div>
      </div>

      <div className="py-[20px] text-[#794A3A] font-dm-sans text-[16px] font-semibold">
        All Devotionals
      </div>

      <div className="w-full overflow-x-auto -ms-4">
        <table className="min-w-[700px] w-full overflow-hidden shadow border-separate border-spacing-x-4">
          <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
            <tr>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                S.No:
              </th>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                Title
              </th>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                Scripture
              </th>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                Status
              </th>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                Created At
              </th>
              <th className="p-[5px] border-b border-[#505050]  text-center   w-fit">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {devotionals.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center">
                  No devotionals found.
                </td>
              </tr>
            ) : (
              paginatedDevotionals.map((devotional, i) => (
                <tr
                  key={devotional._id}
                  className="border-b border-[#DEE2E6]/50 "
                >
                  <td className="p-[5px] text-center border-b-1 text-sm border-[#F9F9F9] text-[#5B5B5B]">
                    {((currentPage - 1) * ITEMS_PER_PAGE + i + 1)
                      .toString()
                      .padStart(2, "0")}
                  </td>

                  <td className="p-[5px] text-center text-sm  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {devotional.title}
                  </td>
                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {devotional.scripture}
                  </td>

                  <td
                    className={`p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]`}
                  >
                    <div
                      className={`${getBgClass(devotional.status)} rounded-md w-fit px-2 mx-auto`}
                    >
                      <Select
                        options={statusOptions}
                        value={
                          devotional.status
                            ? statusOptions[0]
                            : statusOptions[1]
                        }
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            handleStatusChange(
                              devotional._id,
                              selectedOption.value
                            );
                          }
                        }}
                        styles={customStyles}
                        isSearchable={false}
                        menuPlacement="auto"
                        className="py-2 min-w-24 react-select-container"
                        classNamePrefix="react-select"
                        components={{
                          IndicatorSeparator: null
                        }}
                      />
                    </div>
                  </td>

                  <td className="p-[5px] text-center text-sm border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {new Date(devotional.createdAt).toISOString().slice(0, 10)}
                  </td>

                  <td className="flex justify-center p-3 text-sm">
                    <button
                      className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                      onClick={Detailspage}
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
                      className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                      onClick={EditDevotion}
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
                      onClick={() => handleDelete(devotional._id)}
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
            <tr className="w-full bg-[#F9F9F9] ">
              <td colSpan={6}>
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
    </>
  );
};

export default DevotionalManagement;
