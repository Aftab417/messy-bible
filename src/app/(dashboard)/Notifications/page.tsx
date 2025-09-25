"use client";

import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 7,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    },
    {
      id: 8,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      icon: "python"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    users: "All Users",
    title: "",
    message: "",
    buttonText: "",
    url: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.message.trim()) {
      const newNotification = {
        id: notifications.length + 1,
        title: formData.title,
        icon: "python"
      };
      setNotifications([newNotification, ...notifications]);
      setFormData({
        users: "All Users",
        title: "",
        message: "",
        buttonText: "",
        url: ""
      });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      users: "All Users",
      title: "",
      message: "",
      buttonText: "",
      url: ""
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-2 mt-5 sm:p-3 md:p-4 lg:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Notifications
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F6805C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#E6704A] transition-colors text-sm sm:text-base"
          >
            + Create New Notification
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-start space-x-4 p-4 sm:p-6 bg-[#F5F5F5] rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              {/* Python Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3776AB] rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.21.36-.16.37-.12.36-.09.34-.07.31-.05.27-.04.22-.02.17-.01.12v7.33l.02.2.05.26.1.3.16.33.25.34.34.34.45.32.59.3.73.26.9.2.13.02.2.01h5.33l.13-.01.2-.02.9-.2.73-.26.59-.3.45-.32.34-.34.25-.34.16-.33.1-.3.04-.26.02-.2.01-.13v-7.33l-.01-.12-.02-.17-.04-.22-.05-.27-.07-.31-.09-.34-.12-.36-.16-.37-.21-.36-.27-.35-.33-.32-.41-.27-.5-.22-.59-.14-.69-.05H9.38l.21-.02.26-.04.3-.07.33-.1.35-.14.35-.19.33-.25.3-.31.26-.38.21-.46.13-.55.05-.63V1.17l.01-.13.02-.2.04-.26.1-.3.16-.33.25-.34.34-.34.45-.32.59-.3.73-.26.9-.2.13-.02.2-.01h5.33l.13.01zM9.45 1.4l-.05.1v6.2l.02.5.05.4.1.32.14.25.18.19.2.14.22.1.24.07.24.04.24.02.24.01h4.24l.24-.01.24-.02.24-.04.24-.07.22-.1.2-.14.18-.19.14-.25.1-.32.05-.4.02-.5V1.5l-.01-.1-.02-.05-.01-.05H9.45zm.65.65h3.8v5.5h-3.8V2.05zm1.2.8v.9h1.4v-.9h-1.4zm0 1.2v.9h1.4v-.9h-1.4zm0 1.2v.9h1.4v-.9h-1.4z"/>
                    <path d="M14.25 15.18l-.9.2-.73.26-.59.3-.45.32-.34.34-.25.34-.16.33-.1.3-.04.26-.02.2.01.13v6.33l.05.63.13.55.21.46.26.38.3.31.33.25.35.19.35.14.33.1.3.07.26.04.21.02h5.33l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.21-.36.16-.37.12-.36.09-.34.07-.31.05-.27.04-.22.02-.17.01-.12v-7.33l-.02-.2-.05-.26-.1-.3-.16-.33-.25-.34-.34-.34-.45-.32-.59-.3-.73-.26-.9-.2-.13-.02-.2-.01H8.77l-.13.01-.2.02-.9.2-.73.26-.59.3-.45.32-.34.34-.25.34-.16.33-.1.3-.04.26-.02.2-.01.13v7.33l.01.12.02.17.04.22.05.27.07.31.09.34.12.36.16.37.21.36.27.35.33.32.41.27.5.22.59.14.69.05h5.33l-.21.02-.26.04-.3.07-.33.1-.35.14-.35.19-.33.25-.3.31-.26.38-.21.46-.13.55-.05.63v-6.33l-.01-.13-.02-.2-.04-.26-.1-.3-.16-.33-.25-.34-.34-.34-.45-.32-.59-.3-.73-.26-.9-.2-.13-.02-.2-.01h-5.33l-.13.01zm.9 1.25l.05-.1v-6.2l-.02-.5-.05-.4-.1-.32-.14-.25-.18-.19-.2-.14-.22-.1-.24-.07-.24-.04-.24-.02-.24-.01H9.45l-.24.01-.24.02-.24.04-.24.07-.22.1-.2.14-.18.19-.14.25-.1.32-.05.4-.02.5v6.2l.01.1.02.05.01.05h4.24zm-.65-.65H10.7v-5.5h3.8v5.5zm-1.2-.8v-.9h-1.4v.9h1.4zm0-1.2v-.9h-1.4v.9h1.4zm0-1.2v-.9h-1.4v.9h1.4z"/>
                  </svg>
                </div>
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm sm:text-base leading-relaxed">
                  {notification.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Notification Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 sm:p-8">
              {/* Modal Header */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Create New Notification
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Users Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Users
                  </label>
                  <div className="relative">
                    <select
                      name="users"
                      value={formData.users}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none appearance-none bg-white"
                    >
                      <option value="All Users">All Users</option>
                      <option value="Specific Users">Specific Users</option>
                      <option value="Admin Only">Admin Only</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Notification Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Notification Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Body
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter Notification Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none text-gray-900 placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Action Button (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Button (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleInputChange}
                        placeholder="Button Text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        placeholder="URL"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 border border-[#F6805C] text-[#F6805C] rounded-lg font-medium hover:bg-[#F6805C] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[#F6805C] text-white rounded-lg font-medium hover:bg-[#E6704A] transition-colors"
                  >
                    Send Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
