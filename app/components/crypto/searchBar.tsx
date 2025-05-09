import { useState } from "react";

export function SearchBar({
    onChange
}: {
    onChange: (newText: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="p-2 border rounded-lg bg-grey-600"
      />
    </div>
  );
}
