import { useState, useEffect } from "react";

export default function RestaurantDetails({
  restroLoading,
  restroError,
  restaurantDetails = [], // Ensure it's always an array
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterBy, setFilterBy] = useState("all"); // Add filter state
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    let filtered = Array.isArray(restaurantDetails)
      ? [...restaurantDetails]
      : [];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((restro) =>
        restro.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by plan status
    if (filterBy !== "all") {
      filtered = filtered.filter((restro) => {
        if (filterBy === "with-plan") {
          return restro.plan && restro.plan.name;
        } else if (filterBy === "without-plan") {
          return !restro.plan || !restro.plan.name;
        }
        return true;
      });
    }

    // Sort by plan price
    filtered.sort((a, b) => {
      const priceA = a.plan?.price || 0;
      const priceB = b.plan?.price || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredRestaurants(filtered);
  }, [searchTerm, sortOrder, filterBy, restaurantDetails]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#5091E5]">Restaurant Details</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by restaurant name..."
          className="border p-2 rounded-md w-full  text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-4 w-full md:w-auto">
          {/* Filter Dropdown */}
          <select
            className="border p-2 rounded-md text-black w-full md:w-auto"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Restaurants</option>
            <option value="with-plan">With Plan</option>
            <option value="without-plan">Without Plan</option>
          </select>

          {/* Sort Dropdown */}
          <select
            className="border p-2 rounded-md text-black w-full md:w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredRestaurants.length} of {restaurantDetails.length} restaurants
      </div>

      {/* Loading and Error Handling */}
      {restroLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#5091E5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : restroError ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          Error: {restroError}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restro) => (
              <div
                key={restro._id}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-[#5091E5]">
                  {restro.restaurantName || "Unnamed Restaurant"}
                </h3>
                <div className="mt-4 space-y-2 text-sm text-black">
                  <p>
                    <strong>Owner:</strong> {restro.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {restro.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {restro.restaurantAddress}
                  </p>
                  <p>
                    <strong>Phone:</strong> {restro.phoneNumber}
                  </p>
                  <div className="mt-3">
                    <div className={`px-2 py-1 rounded text-nowrap ${
                      restro.plan?.name 
                        ? 'bg-[#5091E5]/10 text-[#5091E5]' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      Plan: {restro.plan?.name || "No plan subscribed"}
                    </div>
                    <div className="mt-1">
                      ${restro.plan?.price || "0"}/month
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No restaurants found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
