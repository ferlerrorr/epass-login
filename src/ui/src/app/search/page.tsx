"use client"; 

import React, { useState, useEffect } from "react";
import SearchForm from "../components/Search/SearchForm";
import SettingsText from "../components/Settings/Settings";

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

      //!todo For refactor
      // setHistory((prevHistory) => {
      //   const newHistory = [...prevHistory, historyEntry];
      //   localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      //   return newHistory;
      // });
    } else {
      setResult(null);
    }
  };

  //!todo For refactor
  // const handleHistoryItemClick = (historyItem: any) => {
  //   setCardId(historyItem.card_id); 
  //   setResult({
  //     card_id: historyItem.card_id,
  //     employee_id: historyItem.employee_id,
  //     total_ar: historyItem.total_ar,
  //     total_ca: historyItem.total_ca,
  //   });
  // };

  //!todo For refactor
  // const toggleHistoryVisibility = () => {
  //   setShowHistory(!showHistory);
  // };

  //!todo For refactor
  // const clearHistory = () => {
  //   setHistory([]);
  //   localStorage.removeItem("searchHistory");
  // };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,139,0.2), rgba(0,0,139,0.5)), url('/Pharmacist.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Settings Component */}
      <div className="absolute top-9 right-1 text-white ">
        <SettingsText />
      </div>

      <SearchForm
        onSearch={handleSearch}
        error={error}
        result={result} // Pass result to SearchForm
        cardId={cardId}
        setCardId={setCardId} // Pass setCardId to SearchForm
      />


    </div>
  );
};

export default SearchPage;
