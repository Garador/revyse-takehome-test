import React from "react";

interface SearchProps {
  onFilter: (filterData: string) => void;
  filter: string;
}

export const SearchBar = ({
  onFilter,
  filter,
}: SearchProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-2 rounded">
      <input
        type="text"
        placeholder="Search crypto..."
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};
