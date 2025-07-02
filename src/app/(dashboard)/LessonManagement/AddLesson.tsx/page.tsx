"use client";
import Image from "next/image";
import { useState} from "react";
 
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

 
const  AddLesson = () => {
 
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    qualifications: "",
    servicesOffered: "",
    fee: "",
    calendlyUrl: "",
    profilePhoto: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
 
 

 

 

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("qualifications", formData.qualifications);
      formDataToSend.append("servicesOffered", formData.servicesOffered);
      formDataToSend.append("fee", formData.fee);
      formDataToSend.append("calendlyUrl", formData.calendlyUrl);
      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      // Call API to add dentist
 

      
      // Reset form and close modal
      resetForm();
 

      toast.success("Dentist added successfully!");
    } catch (error) {
      console.error("Failed to add dentist:", error);
      toast.error("Failed to add dentist");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      qualifications: "",
      servicesOffered: "",
      fee: "",
      calendlyUrl: "",
      profilePhoto: null
    });
    setImagePreview(null);
  };

 

   
 

  return (
    <>
     

      

      {/* Add New Dentist Modal */}
         <div
            className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-lg w-full max-w-4xl p-6 mx-4 overflow-y-auto max-h-[90vh] scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-[21px]">
              Add New Dentist
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="border-2 border-dashed gap-5 border-[#06b6d4] bg-[#F6F6F6] dark:bg-gray-800 rounded-lg py-10 mb-4 flex flex-col items-center justify-center relative">
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                {imagePreview ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                    <p className="text-[#333333] dark:text-white font-semibold text-[14px] mt-2">
                      Upload Image
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Email"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Phone Number
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <div className="relative">
                      <select className="appearance-none bg-[#229EDA] py-4 text-white border-0 rounded-l-md focus:ring-2 focus:ring-[#06b6d4] focus:outline-none pl-3 pr-8 text-sm">
                        <option>+1</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-white pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 712345678"
                      className="w-full px-4 py-3 bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter Location"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    placeholder="Enter Qualifications"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Services Offered
                  </label>
                  <input
                    type="text"
                    name="servicesOffered"
                    value={formData.servicesOffered}
                    onChange={handleInputChange}
                    placeholder="Enter Services (comma separated)"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Fee
                  </label>
                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                    placeholder="Enter Fee"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="block mb-1 text-[#333333] dark:text-white font-semibold text-[16px]">
                    Calendly URL
                  </label>
                  <input
                    type="text"
                    name="calendlyUrl"
                    value={formData.calendlyUrl}
                    onChange={handleInputChange}
                    placeholder="Enter Calendly URL"
                    className="w-full px-4 py-[0.85rem] bg-[#F6F6F6] dark:bg-gray-700 dark:text-gray-100 text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

       
            </form>
          </div>
    </>
  );
};

export default  AddLesson;