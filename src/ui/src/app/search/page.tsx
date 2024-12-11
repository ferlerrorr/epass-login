"use client";  // Mark as a client component

import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import SearchHistory from "../components/SearchHistory";


const SearchPage: React.FC = () => {
  const staticData = [
    { card_id: "123", employee_id: "emp001", total_ar: 500, total_ca: 300 },
    { card_id: "456", employee_id: "emp002", total_ar: 1000, total_ca: 600 },
    { card_id: "789", employee_id: "emp003", total_ar: 1500, total_ca: 800 },
    // Add other data here...
  ];

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>("");

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (cardId: string) => {
    const trimmedCardId = cardId.trim();

    if (!trimmedCardId) {
      setError("Please enter a valid Card ID.");
      setResult(null);
      return;
    }

    setError(""); 

    const foundData = staticData.find(
      (data) => data.card_id.toLowerCase() === trimmedCardId.toLowerCase()
    );

    if (foundData) {
      const historyEntry = {
        ...foundData,
        timestamp: new Date().toLocaleString(),
      };

      setResult(foundData);
      setHistory((prevHistory) => {
        const newHistory = [...prevHistory, historyEntry];
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
        return newHistory;
      });
    } else {
      setResult(null);
    }
  };

  const handleHistoryItemClick = (historyItem: any) => {
    setCardId(historyItem.card_id); // Update the cardId state to reflect the clicked history card_id
    setResult({
      card_id: historyItem.card_id,
      employee_id: historyItem.employee_id,
      total_ar: historyItem.total_ar,
      total_ca: historyItem.total_ca,
    });
  };

  const toggleHistoryVisibility = () => {
    setShowHistory(!showHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <h1 className="text-3xl font-bold mb-6">Search for a Card</h1> */}

      <SearchForm
        onSearch={handleSearch}
        error={error}
        result={result} // Pass result to SearchForm
        cardId={cardId}
        setCardId={setCardId} // Pass setCardId to SearchForm
      />

      <button
        onClick={toggleHistoryVisibility}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-600 fixed"
        style={{ top: '-.5em', right: '.51em' }}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      <SearchHistory
        history={history}
        onHistoryItemClick={handleHistoryItemClick}
        clearHistory={clearHistory}
        showHistory={showHistory}
      />

    </div>
  );
};

export default SearchPage;
