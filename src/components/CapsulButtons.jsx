import { useState } from "react";

const CapsulButtons = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Live",
    "Sports",
    "Education",
    "Entertainment",
    "Technology",
    "Comedy",
    "Cooking",
    "Travel",
    "Fashion",
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category === "All" ? null : category);
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide border-b">
      <div className="flex gap-3 p-4 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CapsulButtons;