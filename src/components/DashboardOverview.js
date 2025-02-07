// components/DashboardOverview.js
export default function DashboardOverview({ loading, plans }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#5091E5]">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
