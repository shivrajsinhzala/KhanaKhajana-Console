// components/FeatureIcon.jsx
"use client";

export default function FeatureIcon({ enabled }) {
  return (
    <svg
      className={`w-5 h-5 ${enabled ? "text-green-500" : "text-red-500"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {enabled ? (
        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
      ) : (
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
      )}
    </svg>
  );
}
