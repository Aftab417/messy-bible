"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const EditSubscription = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const duration = searchParams.get("duration");
  const active = searchParams.get("active");

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Edit Subscription</h1>
      <form className="space-y-4">
        <input
          defaultValue={name ?? ""}
          className="block w-full p-2 border rounded"
          placeholder="Plan Name"
        />
        <input
          defaultValue={price ?? ""}
          className="block w-full p-2 border rounded"
          placeholder="Price"
        />
        <input
          defaultValue={duration ?? ""}
          className="block w-full p-2 border rounded"
          placeholder="Duration"
        />
        <select
          defaultValue={active === "true" ? "active" : "inactive"}
          className="block w-full p-2 border rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#FA8059] rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditSubscription;
