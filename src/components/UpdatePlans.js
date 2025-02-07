// components/UpdatePlans.js
import PlanCard from "./PlanCard";

export default function UpdatePlans({ plans, loading, setEditingPlan }) {
  return (
    <div className="space-y-6">
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
              frequency: "month",
              tag: "",
              features: [],
            })
          }
          className="bg-[#5091E5] text-white px-4 py-2 rounded-lg hover:bg-[#6BB1FF] transition-colors flex items-center gap-2 shadow-lg hover:shadow-[#5091E5]/30"
        >
          Add New Plan
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#5091E5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} setEditingPlan={setEditingPlan} />
          ))}
        </div>
      )}
    </div>
  );
}
