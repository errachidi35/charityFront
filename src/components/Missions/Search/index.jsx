import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export const Search = ({ onSearch }) => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch({ keywords, location });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md mb-12 flex flex-col md:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">What do you want to do?</label>
        <Input
          placeholder="Keywords, mission title..."
          className="w-full"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Where?</label>
        <Input
          placeholder="31000 Toulouse"
          className="w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex items-end">
        <Button
          className="bg-green-primary hover:bg-green-700 w-full md:w-auto"
          onClick={handleSearch}
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
};
