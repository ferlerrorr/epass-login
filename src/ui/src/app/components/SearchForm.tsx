import React, { useEffect, useRef, useState } from "react";
import EpassTransaction from "./EpassTransaction"; // Import EpassTransaction component

interface SearchFormProps {
  onSearch: (cardId: string) => void;
  error: string;
  result: any;
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  error,
  result,
  cardId,
  setCardId,
}) => {
  const [searched, setSearched] = useState(false);
  const [inputError, setInputError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    cardIdRef.current?.focus();
  }, []);

  const handleSearchClick = () => {
    if (!validateCardId()) return;
    triggerSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!validateCardId()) return;
      triggerSearch();
    }
  };

  const validateCardId = (): boolean => {
    if (!cardId.trim()) {
      setInputError("Please enter a valid Card ID");
      setSearched(false);
      return false;
    }
    setInputError("");
    return true;
  };

  const triggerSearch = () => {
    onSearch(cardId.trim());
    setSearched(true);
  };

  const shouldShowError = searched && !result && cardId.trim() && !error;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardId(e.target.value);
    if (!e.target.value.trim()) {
      setSearched(false);
      setInputError("");
    }
  };

  const handleKeyUp = () => {
    if (!cardId.trim()) {
      setSearched(false);
      setInputError("");
    }
  };

  const handleOpenFormClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false); // Close the EpassTransaction form
  };

  const handleCloseResultCard = () => {
    setSearched(false); // Close the result card
    setCardId(""); // Reset cardId
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
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
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
      {inputError && <p className="text-red-500">{inputError}</p>}

      {/* Result Section */}
      {searched && cardId.trim() && result && (
        <div className="p-4 bg-white border rounded-md shadow-md w-96">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Card Details</h2>
            <button
              onClick={handleCloseResultCard}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <p><strong>Card ID:</strong> {result.card_id}</p>
          <p><strong>Employee ID:</strong> {result.employee_id}</p>
          <p><strong>Total AR:</strong> {result.total_ar}</p>
          <p><strong>Total CA:</strong> {result.total_ca}</p>

          {/* Button to trigger EpassTransaction modal */}
          <button
            onClick={handleOpenFormClick}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Open Epass Transaction Form
          </button>

          {/* Render EpassTransaction modal if open */}
          {isModalOpen && (
            <EpassTransaction 
              initialCardId={result.card_id} 
              employeeId={result.employee_id} 
              totalAr={result.total_ar} 
              totalCa={result.total_ca} 
              onClose={handleCloseForm} 
            />
          )}
        </div>
      )}

      {/* No Data Found Error */}
      {shouldShowError && (
        <p className="text-red-500">
          No data found for the entered Card ID.
        </p>
      )}

      {/* General Error Message */}
      {searched && error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchForm;
