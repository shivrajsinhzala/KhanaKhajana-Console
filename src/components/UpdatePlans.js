import { useState } from "react";
import PlanCard from "./PlanCard";

export default function UpdatePlans({ plans, loading, setEditingPlan }) {
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Filter plans based on user input
  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort plans by price
  const sortedPlans = [...filteredPlans].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#5091E5]">
          Manage Subscription Plans
        </h1>
        <button
          onClick={() =>
            setEditingPlan({
              _id: "new",
              name: "",
              description: "",
              price: 0,
              frequency: "per month",
              tag: "",
              features: [],
            })
          }
          className="bg-[#5091E5] text-white px-4 py-2 rounded-lg hover:bg-[#6BB1FF] transition-colors flex items-center gap-2 shadow-lg hover:shadow-[#5091E5]/30"
        >
          Add New Plan
        </button>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search plans..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full text-black"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded-lg text-black"
        >
          <option value="asc">Sort by Price (Low to High)</option>
          <option value="desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#5091E5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              setEditingPlan={setEditingPlan}
            />
          ))}
        </div>
      )}
    </div>
  );
}
