"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation"; // Note: 'next/navigation' not 'next/router'

// Define the Subscription type based on dummyUsers
interface Subscription {
  _id: string;
  PlanName: string;
  Price: string;
  Duration: string;
  createdAt: string;
  is_active: boolean;
}

const dummyUsers: Subscription[] = [
  {
    _id: "1",
    PlanName: "Freemium",
    Price: "$0",
    Duration: "Always Free",
    createdAt: "2023-05-15T08:23:12.000Z",
    is_active: true
  },
  {
    _id: "2",
    PlanName: "Premium Monthly",
    Price: "$7.99	",
    Duration: "Monthly",
    createdAt: "2023-04-22T14:45:00.000Z",
    is_active: true
  },
  {
    _id: "3",
    PlanName: "Annual Plan",
    Price: "$79/year",
    Duration: "1 Year",
    createdAt: "2023-03-10T09:12:33.000Z",
    is_active: false
  },
  {
    _id: "4",
    PlanName: "Family Plan",
    Price: "$14.99/month",
    Duration: "Monthly",
    createdAt: "2023-02-28T16:30:45.000Z",
    is_active: true
  },
  {
    _id: "5",
    PlanName: "Founder's Lifetime",
    Price: "$97 one-time ",
    Duration: "Lifetime",
    createdAt: "2023-01-15T11:05:21.000Z",
    is_active: true
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState<Subscription[]>(dummyUsers);

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

  const router = useRouter();

  const handleClick = () => {
    router.push("/SubscriptionManagement/ViewPlansUsers");
  };
  const AddSubscription = () => {
    router.push("/SubscriptionManagement/AddSubscription");
  };

  return (
    <>
      <div className="justify-between lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold pt-[15px]">
          Subscription Management
        </h1>

        <div className="gap-4 items-center sm:flex">
          <button
            onClick={AddSubscription}
            className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[18px] w-full sm:w-[200px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px]"
          >
            + Add New Subscription
          </button>
        </div>
      </div>

      <div className="py-[20px] text-[#794A3A] font-dm-sans text-[16px] font-semibold">
        All Subscriptions
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[700px] w-full overflow-hidden shadow border-separate border-spacing-x-4">
          <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
            <tr>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                S.No:
              </th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                Plan Name
              </th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                Price
              </th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                Duration
              </th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                Status
              </th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">
                Actions
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
              users.map((subscription: Subscription, i: number) => (
                <tr
                  key={subscription._id}
                  className="border-b border-[#DEE2E6]/50 "
                >
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {i + 1}
                  </td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {subscription.PlanName}
                  </td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {subscription.Price}
                  </td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    {subscription.Duration}
                  </td>
                  <td className="p-[8px] text-center  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    <select
                      value={subscription.is_active ? "active" : "inactive"}
                      onChange={(e) =>
                        handleStatusChange(subscription._id, e.target.value)
                      }
                      className={`p-[6px] font-medium focus:outline-none transition-colors rounded-[6px]  cursor-pointer duration-200 ${getBgClass(subscription.is_active)}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="flex justify-center p-3">
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
                    <button className="mx-1 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
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
                      onClick={() => handleDelete(subscription._id)}
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagement;
