
"use client"; 

import React, { useEffect, useRef, useState } from "react";

interface SearchFormProps {
  onSearch: (cardId: string) => void;
  error: string;
  result: any;
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, error, result, cardId, setCardId }) => {
  const [searched, setSearched] = useState(false); // Track if the search was triggered
  const [inputError, setInputError] = useState(""); // Input validation error
  const cardIdRef = useRef<HTMLInputElement>(null);

  // Focus on the input field when the component mounts
  useEffect(() => {
    cardIdRef.current?.focus();
  }, []);

  // Handle search logic on button click
  const handleSearchClick = () => {
    if (!validateCardId()) return;
    triggerSearch();
  };

  // Handle search logic on pressing "Enter" key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!validateCardId()) return;
      triggerSearch();
    }
  };

  // Validate the card ID input
  const validateCardId = (): boolean => {
    if (!cardId.trim()) {
      setInputError("Please enter a valid Card ID");
      setSearched(false); // Clear searched state when the input is invalid
      return false;
    }
    setInputError("");
    return true;
  };

  // Trigger the search and update the searched state
  const triggerSearch = () => {
    onSearch(cardId.trim());
    setSearched(true);
  };

  // Determine if no result was found
  const shouldShowError = searched && !result && cardId.trim() && !error;

  // Clear the search state if the input is empty
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardId(e.target.value);
    if (!e.target.value.trim()) {
      setSearched(false); // Reset searched state when input is cleared
      setInputError("");   // Reset error message if input is cleared
    }
  };

  // Check input on keyup, clear search if input is empty or null
  const handleKeyUp = () => {
    if (!cardId.trim()) {
      setSearched(false); // Reset searched state if input is empty
      setInputError("");  // Clear any existing input error
    }
  };

  return (
    <div
      className="flex flex-col items-center space-y-4 mb-6 fixed"
      style={{ top: "26em", left: "50%", transform: "translateX(-50%)" }}
    >
      {/* Input Field */}
      <div className="flex items-center space-x-4">
        <input
          ref={cardIdRef}
          type="text"
          placeholder="Enter card ID"
          value={cardId}
          onChange={handleInputChange} // Handle input change
          onKeyUp={handleKeyUp} // Check input on keyup
          className="px-4 py-2 border border-gray-300 rounded-md"
          autoComplete="off"
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearchClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Input Error Message */}
      {inputError && (
        <p className="text-red-500">
          {inputError}
        </p>
      )}

      {/* Result Section */}
      {searched && cardId.trim() && result && (
        <div className="p-4 bg-white border rounded-md shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Card Details</h2>
          <p><strong>Card ID:</strong> {result.card_id}</p>
          <p><strong>Employee ID:</strong> {result.employee_id}</p>
          <p><strong>Total AR:</strong> {result.total_ar}</p>
          <p><strong>Total CA:</strong> {result.total_ca}</p>
        </div>
      )}

      {/* No Data Found Error */}
      {shouldShowError && (
        <p className="text-red-500">
          No data found for the entered Card ID.
        </p>
      )}

      {/* General Error Message */}
      {searched && error && (
        <p className="text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchForm;
