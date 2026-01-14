"use client";

export default function LoadingSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border rounded shadow p-4 bg-white dark:bg-gray-800 animate-pulse"
        >
          <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-4 mx-auto w-24"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}
