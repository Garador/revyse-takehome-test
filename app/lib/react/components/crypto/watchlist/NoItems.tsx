import React from "react";

const NoItems: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
        <svg
            className="w-10 h-10 mb-3 text-cyan-400 dark:text-cyan-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
            />
        </svg>
        <span className="text-base font-medium">
            Add items by pressing the{" "}
            <span className="font-semibold text-cyan-500 dark:text-cyan-300">
                'Add'
            </span>{" "}
            button on the results
        </span>
    </div>
);

export default NoItems;