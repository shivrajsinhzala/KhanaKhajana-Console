"use client";
import { motion } from "framer-motion";

export default function EditPlanModal({
  editingPlan,
  setEditingPlan,
  handlePlanAction,
}) {
  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...(editingPlan.features ?? [])];
    updatedFeatures[index] = { ...updatedFeatures[index], [key]: value };
    setEditingPlan({ ...editingPlan, features: updatedFeatures });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const planData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      frequency: formData.get("frequency"),
      tag: formData.get("tag"),
      features: (editingPlan.features ?? []).map((feature, index) => ({
        ...feature,
        featureName: formData.get(`featureName${index}`) || "",
        isEnabled: formData.get(`isEnabled${index}`) === "on",
      })),
    };

    if (planData.features.length === 0) {
      alert("Please add at least one feature.");
      return;
    }

    handlePlanAction(editingPlan._id, planData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-[#5091E5] mb-6">
          {editingPlan?._id === "new" ? "Create New Plan" : "Edit Plan"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Name*
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingPlan.name}
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                  name="description"
                  defaultValue={editingPlan.description}
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price*
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  defaultValue={editingPlan.price}
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequency*
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    name="frequency"
                    value={editingPlan.frequency}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        frequency: e.target.value,
                      })
                    }
                    className="flex-1 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-[#5091E5]"
                    placeholder="Enter frequency"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingPlan({ ...editingPlan, frequency: "per month" })
                    }
                    className={`px-3 py-2 text-sm rounded-md ${
                      editingPlan.frequency === "per month"
                        ? "bg-[#5091E5] text-white"
                        : "bg-[#5091E5]/10 text-[#5091E5] hover:bg-[#5091E5]/20"
                    }`}
                  >
                    per month
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingPlan({ ...editingPlan, frequency: "per year" })
                    }
                    className={`px-3 py-2 text-sm rounded-md ${
                      editingPlan.frequency === "per year"
                        ? "bg-[#5091E5] text-white"
                        : "bg-[#5091E5]/10 text-[#5091E5] hover:bg-[#5091E5]/20"
                    }`}
                  >
                    per year
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Tag
                </label>
                <input
                  type="text"
                  name="tag"
                  defaultValue={editingPlan.tag}
                  className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
                  placeholder="e.g., Most Popular"
                />
              </div>
            </div>

            {/* Right Column (Features) */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Features*
              </label>

              <div className="space-y-4">
                {(editingPlan.features ?? []).map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2 items-start">
                      <input
                        type="text"
                        name={`featureName${index}`}
                        value={feature.featureName}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "featureName",
                            e.target.value
                          )
                        }
                        className="flex-1 p-2 border text-black border-gray-300 rounded-md"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = [...editingPlan.features];
                          newFeatures.splice(index, 1);
                          setEditingPlan({
                            ...editingPlan,
                            features: newFeatures,
                          });
                        }}
                        className="mt-1 text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={`isEnabled${index}`}
                        checked={feature.isEnabled}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "isEnabled",
                            e.target.checked
                          )
                        }
                        className="form-checkbox h-4 w-4 text-[#5091E5] rounded focus:ring-[#5091E5]"
                      />
                      <span className="text-sm text-gray-700">
                        Enable Feature
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingPlan({
                    ...editingPlan,
                    features: [
                      ...(editingPlan.features ?? []),
                      { featureName: "", isEnabled: false },
                    ],
                  });
                }}
                className="w-full py-2 px-4 border-2 border-dashed border-[#5091E5] text-[#5091E5] rounded-md hover:bg-[#5091E5]/10 transition-colors"
              >
                + Add Feature
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5091E5] text-white rounded-md hover:bg-[#6BB1FF]"
            >
              {editingPlan?._id === "new" ? "Create Plan" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
