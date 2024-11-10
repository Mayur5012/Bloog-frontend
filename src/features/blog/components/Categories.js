import React, { useState, useEffect, useRef } from "react";

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  
  // fetching categories using apis
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories");
        const data = await response.json();
        setCategories([
          {
            id: 0,
            label: "All",
            value: "All",
            icon: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
          },
          ...data,
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Calculating scroll amount based on the width of visible container
  const getScrollAmount = () => {
    if (scrollContainerRef.current) {
      //scroll by half of the container's width
      return scrollContainerRef.current.clientWidth / 2; 
    }
    return 200; 
  };

  // previous arrow click
  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  // next arrow click
  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  // category click
  const handleCategoryClick = (category) => {
    // console.log(category.value);
    setSelectedCategory(category.value);
    onCategorySelect(category.value);
  };
//   useEffect(() => {
//     console.log('selectedCategory updated:', selectedCategory);
// }, [selectedCategory]);

  return (
    <div className="relative py-4 px-6">
      <div className="flex items-center justify-between mb-4">
        {/* ---------previous button------------ */}
        <button
          className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 mr-2"
          onClick={handlePrev}
    c    >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

       {/* ---------- categories bar--------------------- */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden overflow-y-hidden space-x-4 sm:space-x-6 px-2 sm:px-4 scrollbar-hide"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 w-20 sm:w-24 text-center cursor-pointer transition-transform transform hover:scale-105 ${
                selectedCategory === category.label ? "underline font-bold" : ""
              }`}
            >
              <img
                src={category.icon || "https://via.placeholder.com/40"}
                alt={category.label}
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full"
              />
              <span className="block text-xs sm:text-sm font-medium text-gray-800">
                {category.label}
              </span>
            </div>
          ))}
        </div>

        {/* -------------------- next button------------------ */}
        <button
          className="p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 ml-2"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Categories;
