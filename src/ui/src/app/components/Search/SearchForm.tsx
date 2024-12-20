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
  const [searched, setSearched] = useState(false); // Controls Result modal
  const [inputError, setInputError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls Transaction modal
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
    setIsModalOpen(false);
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
    setSearched(false); 
   
  };

  const handleCloseForm = () => {
    setIsModalOpen(false); // Close Transaction modal
  };

  const handleCloseResultCard = () => {
    setSearched(false); 
    setCardId("");
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
          onKeyDown={handleKeyPress}
          className="px-2.5 py-2 border border-gray-300 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-deepBlue tracking-[1.8px] font-semibold "
          autoComplete="off"
        />
        <button
          onClick={handleSearchClick}
          className="px-6 py-2 bg-deepBlue text-white rounded-md hover:bg-blue-600 font-semibold tracking-[1.8px]"
        >
          Search
        </button>
      </div>

      {/* Input Error Message */}
      {inputError && <p className="text-error">{inputError}</p>}

      {/* Result Section */}
      {searched && cardId.trim() && result && (
        <div
          className="p-6 pl-7 pt-7 bg-white border rounded-md shadow-md w-96"
          style={{ letterSpacing: "2.5px" }}
        >
          <div className="flex justify-between items-start">
            <h2 className="text-xl text-headings font-bold mb-6">Card Details</h2>
            <button
              onClick={handleCloseResultCard}
              className="text-gray-400 hover:text-gray-700 font-bold text-sm"
            >
              Close
            </button>
          </div>

          
          <div className="grid grid-cols-2 gap-20 mb-0">
          {/* Left Grid */}
          <div className=" flex flex-col gap-7">
            <p className="flex flex-col gap-2">
              <strong className="text-title">
                Card ID
              </strong>
              <strong >{result.card_id}</strong>
            </p>
            <p className="flex flex-col gap-2">
              <strong  className="text-title">
                Employee ID
              </strong>
              <strong >{result.employee_id}</strong>
            </p>
          </div>

          {/* Right Grid */}
          <div className=" flex flex-col gap-7">
          <p className="flex flex-col gap-2">
              <strong className="text-title">
                Total AR
              </strong>
              <strong className="font-extrabold text-focusvalue">{result.total_ar}</strong>
            </p>
            <p className="flex flex-col gap-2">
              <strong  className="text-title">
                Total CA
              </strong>
              <strong className="font-extrabold text-focusvalue">{result.total_ca}</strong>
            </p>
          </div>
        </div>


          <div className="flex justify-end">
            {/* Button to trigger EpassTransaction modal */}
            <button
              onClick={handleOpenFormClick}
              className="mt-7 px-4 py-2 bg-deepBlue font-semibold text-white rounded-md hover:bg-blue-600"
            >
              Make Transaction
            </button>
          </div>
        </div>
      )}

      {/* Render EpassTransaction modal */}
      {isModalOpen && (
        <EpassTransaction
          initialCardId={result?.card_id || ""}
          employeeId={result?.employee_id || ""}
          totalAr={result?.total_ar || ""}
          totalCa={result?.total_ca || ""}
          onClose={handleCloseForm} // Close only Transaction modal
        />
      )}

      {/* No Data Found Error */}
      {shouldShowError && (
        <p className="text-error">No data found for the entered Card ID.</p>
      )}

      {/* General Error Message */}
      {searched && error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default SearchForm;
