import React, { useRef, useState } from "react";

interface SearchFormProps {
  onSearch: (cardId: string) => void;
  error: string;
  result: any;  // Pass result to SearchForm
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, error, result, cardId, setCardId }) => {
  const [searched, setSearched] = useState(false); // Track if the search button was clicked
  const [inputError, setInputError] = useState(""); // Track error state for invalid card ID
  const cardIdRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!cardId.trim()) {
        setInputError("Please enter a valid Card ID");
      } else {
        onSearch(cardId.trim());
        setSearched(true); // Set searched to true when Enter key is pressed
        setInputError(""); // Clear error if valid card ID is provided
      }
    }
  };

  const handleSearchClick = () => {
    if (!cardId.trim()) {
      setInputError("Please enter a valid Card ID");
    } else {
      onSearch(cardId.trim());
      setSearched(true); // Set searched to true when search button is clicked
      setInputError(""); // Clear error if valid card ID is provided
    }
  };

  // Show error if no result found and cardId is not empty, only after button click or Enter key press
  const shouldShowError = searched && !result && cardId.trim() && !error;

  return (
    <div className="flex items-center space-x-4 mb-6 fixed" style={{ top: '26em', left: '50%', transform: 'translateX(-50%)' }}>
      <input
        type="text"
        placeholder="Enter card ID"
        value={cardId}
        onChange={(e) => setCardId(e.target.value)} // Handle input change
        className="px-4 py-2 border border-gray-300 rounded-md"
        autoComplete="off"
        onKeyDown={handleKeyPress}
      />
      {/* Render Search button always, it will handle empty input */}
      <button
        onClick={handleSearchClick}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={!cardId.trim()} // Disable button if the input is empty
      >
        Search
      </button>

      {/* Show error for invalid card ID when search is triggered (Enter or button click) */}
      {inputError && (
        <p className="mt-6 text-red-500 fixed" style={{ top: '2em' }}>
          {inputError}
        </p>
      )}

      {/* Render result only after search button is clicked */}
      {searched && cardId.trim() && result && (
        <div className="mt-6 p-4 bg-white border rounded-md shadow-md w-96 fixed" style={{ top: '2em' }}>
          <h2 className="text-xl font-semibold">Card Details</h2>
          <p><strong>Card ID:</strong> {result.card_id}</p>
          <p><strong>Employee ID:</strong> {result.employee_id}</p>
          <p><strong>Total AR:</strong> {result.total_ar}</p>
          <p><strong>Total CA:</strong> {result.total_ca}</p>
        </div>
      )}

      {/* Show error if no result found and cardId is not empty, only after button click */}
      {shouldShowError && (
        <p className="mt-6 text-red-500 fixed" style={{ top: '2em' }}>
          No data found for the entered Card ID.
        </p>
      )}

      {/* Show error message if there's a general error, only after button click */}
      {searched && error && (
        <p className="mt-6 text-red-500 fixed" style={{ top: '2em' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchForm;
