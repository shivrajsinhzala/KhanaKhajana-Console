import { useState, useEffect } from "react";

export default function RestaurantDetails({
  restroLoading,
  restroError,
  restaurantDetails,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    let filtered = restaurantDetails;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((restro) =>
        restro.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by plan price
    filtered = filtered.sort((a, b) => {
      const priceA = a.plan?.price || 0;
      const priceB = b.plan?.price || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredRestaurants(filtered);
  }, [searchTerm, sortOrder, restaurantDetails]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#5091E5]">Restaurant Details</h1>

      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by restaurant name..."
          className="border p-2 rounded-md w-full max-w-sm text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <select
          className="border p-2 rounded-md text-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: High to Low</option>
          <option value="desc">Price: Low to High</option>
        </select>
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
                  {restro.restaurantName}
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
                  <p className="mt-3 ">
                    <span className="bg-[#5091E5]/10 text-[#5091E5] px-2 py-1 rounded text-nowrap">
                      Plan: {restro.plan?.name || "No plan subscribed"}
                    </span>
                    <p className="my-2">
                      ${restro.plan?.price || "0"}/month
                    </p>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No restaurants found.</p>
          )}
        </div>
      )}
    </div>
  );
}
