import React from "react";

const ComingSoon = ({ title, icon, description }) => {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center bg-white dark:bg-[#0f0f0f] px-4">
      <div className="flex flex-col items-center gap-5 max-w-sm text-center">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#272727] flex items-center justify-center text-5xl">
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-[#f1f1f1]">{title}</h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-[#aaa] text-sm leading-relaxed">
          {description || "This section is coming soon. We're working hard to bring it to you."}
        </p>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#272727] text-gray-700 dark:text-[#f1f1f1] text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          Coming Soon
        </span>
      </div>
    </div>
  );
};

export default ComingSoon;
