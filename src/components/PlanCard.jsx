// components/PlanCard.jsx
"use client";
import { motion } from "framer-motion";
import { PencilIcon } from "@heroicons/react/24/solid";
import FeatureIcon from "./FeatureIcon";

export default function PlanCard({ plan, setEditingPlan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition-all relative"
    >
      <button
        onClick={() => setEditingPlan(plan)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <PencilIcon className="w-5 h-5 text-[#5091E5]" />
      </button>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#5091E5]">{plan.name}</h3>
        {plan.tag && (
          <span className="inline-block bg-[#5091E5]/10 text-[#5091E5] px-3 py-1 rounded-full text-sm">
            {plan.tag}
          </span>
        )}
        <p className="text-gray-600">{plan.description}</p>
        <div className="bg-[#5091E5]/10 p-4 rounded-lg">
          <p className="text-2xl font-bold text-[#5091E5]">
            ${plan.price}
            <span className="text-sm ml-2 text-gray-500">
              /{plan.frequency}
            </span>
          </p>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-black">
              <FeatureIcon enabled={feature.isEnabled} />
              <span>{feature.featureName}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
