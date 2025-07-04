'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
 
 import { useRouter } from 'next/navigation'; // Note: 'next/navigation' not 'next/router'


const dummyUsers = [
  {
    "_id": "1",
"PlanName":"Freemium",
"Price":"$0",
"Duration":"Always Free",
"createdAt": "2023-05-15T08:23:12.000Z",
    "is_active": true
  },
  {
    "_id": "2",
"PlanName":"Premium Monthly",
"Price":"$7.99	",
"Duration":"Monthly",
"createdAt": "2023-04-22T14:45:00.000Z",
    "is_active": true
  },
  {
    "_id": "3",
"PlanName":"Annual Plan",
"Price":"$79/year",
"Duration":"1 Year",
"createdAt": "2023-03-10T09:12:33.000Z",
    "is_active": false
  },
  {
    "_id": "4",
"PlanName":"Family Plan",
"Price":"$14.99/month",
"Duration":"Monthly",
"createdAt": "2023-02-28T16:30:45.000Z",
    "is_active": true
  },
  {
    "_id": "5",
"PlanName":"Founder's Lifetime",
"Price":"$97 one-time ",
"Duration":"Lifetime",
"createdAt": "2023-01-15T11:05:21.000Z",
    "is_active": true
  },
  
];

const UserManagement = () => {
    const [users, setUsers] = useState(dummyUsers);
     const [searchTerm, setSearchTerm] = useState('');
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);



  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success('User deleted successfully!');
      }
    } catch (error) {
      console.error('Delete failed', error);
      toast.error('Failed to delete user');
    }
  };

  const handleStatusChange = (id: string, value: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, is_active: value === 'active' } : user
      )
    );
  };

  const getBgClass = (isActive: boolean) => {
    return isActive ? 'bg-[#FA865F] text-white' : 'bg-[#F9C661]  text-white';
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
                ? 'bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]'
                : 'text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white'
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
              ? 'bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]'
              : 'text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white'
          }`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(<span key="start-ellipsis" className="px-2">...</span>);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i
                ? 'bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]'
                : 'text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white'
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(<span key="end-ellipsis" className="px-2">...</span>);
      }

      buttons.push(
        <button
          key={totalPages}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? 'bg-[#F6805C] text-white py-[6px] px-[16px] rounded-[8px]'
              : 'text-[#5B5B5B] hover:bg-[#1C252E] hover:text-white'
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
  const filteredUsers = users.filter(user => 
    user.PlanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.Duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



 



  const router = useRouter();

  const handleClick = () => {
    router.push('/UserDetails'); // Now this will work correctly
  };
  const AddSubscription = () => {
    router.push('/SubscriptionManagement/AddSubscription'); // Now this will work correctly
  };

  return (
    <>
      <div className="lg:flex justify-between">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold pt-[15px]">
         Subscription Management
        </h1>

        <div className="sm:flex items-center gap-4">
 
          

           <div className="flex items-center bg-[#F5F5F5] rounded-[12px] px-[18px] py-[14px] md:w-[250px]">
            <input
              type="text"
              placeholder="Search User"
              className="bg-transparent focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
           
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
          onClick={AddSubscription}
          className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[18px] w-full sm:w-[200px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px]">
          + Add New Subscription
          </button> 
        </div>
      </div>

      <div className="py-[20px] text-[#794A3A] font-dm-sans text-[16px] font-semibold">
      All Subscriptions
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full overflow-hidden shadow border-separate border-spacing-x-4">
          <thead className="text-[#794A3A] font-dm-sans text-[14px] font-semibold ">
            <tr>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">S.No:</th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">Plan Name</th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">Price</th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">Duration</th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">Status</th>
              <th className="p-[5px] border-b border-[#505050] text-start w-fit">Actions</th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-900 ">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((subscription, i) => (
                <tr key={subscription._id} className="border-b border-[#DEE2E6]/50 ">
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">{subscription.PlanName}</td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">{subscription.Price}</td>
                  <td className="p-[8px]  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">{subscription.Duration}</td>
                  <td className="p-[8px] text-center  border-b-1 border-[#F9F9F9] text-[#5B5B5B]">
                    <select
                      value={subscription.is_active ? 'active' : 'inactive'}
                      onChange={(e) => handleStatusChange(subscription._id, e.target.value)}
                      className={`p-[6px] font-medium focus:outline-none transition-colors rounded-[6px]  cursor-pointer duration-200 ${getBgClass(subscription.is_active)}`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="p-3 flex justify-center">
                    <button
                       
                      className="cursor-pointer mx-1  hover:scale-110 transition-transform duration-300 ease-in-out"
                     onClick={handleClick}
                    >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="3" fill="#6AC8C4"/>
<path d="M10 8C9.42135 8 8.86639 8.21071 8.45722 8.58579C8.04805 8.96086 7.81818 9.46957 7.81818 10C7.81818 10.5304 8.04805 11.0391 8.45722 11.4142C8.86639 11.7893 9.42135 12 10 12C10.5787 12 11.1336 11.7893 11.5428 11.4142C11.9519 11.0391 12.1818 10.5304 12.1818 10C12.1818 9.46957 11.9519 8.96086 11.5428 8.58579C11.1336 8.21071 10.5787 8 10 8ZM10 13.3333C9.03558 13.3333 8.11065 12.9821 7.4287 12.357C6.74675 11.7319 6.36364 10.8841 6.36364 10C6.36364 9.11595 6.74675 8.2681 7.4287 7.64298C8.11065 7.01786 9.03558 6.66667 10 6.66667C10.9644 6.66667 11.8893 7.01786 12.5713 7.64298C13.2532 8.2681 13.6364 9.11595 13.6364 10C13.6364 10.8841 13.2532 11.7319 12.5713 12.357C11.8893 12.9821 10.9644 13.3333 10 13.3333ZM10 5C6.36364 5 3.25818 7.07333 2 10C3.25818 12.9267 6.36364 15 10 15C13.6364 15 16.7418 12.9267 18 10C16.7418 7.07333 13.6364 5 10 5Z" fill="white"/>
</svg>


                    </button>
                    <button
                      onClick={() => handleDelete(subscription._id)}
                      className="cursor-pointer mx-1  hover:scale-110 transition-transform duration-300 ease-in-out"
                    >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="3" fill="#FF1919"/>
<path d="M6.875 16C6.53125 16 6.23708 15.8696 5.9925 15.6087C5.74792 15.3478 5.62542 15.0338 5.625 14.6667V6H5V4.66667H8.125V4H11.875V4.66667H15V6H14.375V14.6667C14.375 15.0333 14.2527 15.3473 14.0081 15.6087C13.7635 15.87 13.4692 16.0004 13.125 16H6.875ZM8.125 13.3333H9.375V7.33333H8.125V13.3333ZM10.625 13.3333H11.875V7.33333H10.625V13.3333Z" fill="white"/>
</svg>

                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* Pagination */}
            <tr className="w-full bg-[#F9F9F9] ">
              <td colSpan={6}>
                  {/* Replace pagination part with below */}
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

export default UserManagement;
