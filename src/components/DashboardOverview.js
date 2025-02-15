export default function DashboardOverview({
  loading,
  plans,
  restaurantDetails,
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#5091E5]">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plans Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Plans</h3>
          {loading ? (
            <div className="flex justify-center mt-2">
              <div className="w-8 h-8 border-4 border-[#5091E5] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <p className="text-2xl font-bold text-[#5091E5] mt-2">
              {plans.length}
            </p>
          )}
        </div>

        {/* Restaurants Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Restaurants Enrolled
          </h3>
          {loading ? (
            <div className="flex justify-center mt-2">
              <div className="w-8 h-8 border-4 border-[#5091E5] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <p className="text-2xl font-bold text-[#5091E5] mt-2">
              {Array.isArray(restaurantDetails) ? restaurantDetails.length : 0}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
