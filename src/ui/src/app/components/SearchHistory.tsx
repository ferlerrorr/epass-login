// src/components/SearchHistory.tsx

"use client"; 

import React from "react";

interface SearchHistoryProps {
  history: any[];
  onHistoryItemClick: (item: any) => void;
  clearHistory: () => void;
  showHistory: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onHistoryItemClick, clearHistory, showHistory }) => {
  return (
    showHistory && history.length > 0 && (
      <div className="mt-6 p-4 bg-white border rounded-md shadow-md w-96 fixed" style={{ top: '2em', right: '0.5rem' }}>
        <h3 className="text-lg font-semibold mb-4">Search History</h3>
        <div className="space-y-2 max-h-[44rem] overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              onClick={() => onHistoryItemClick(item)}
            >
              <p className="font-semibold">{item.card_id}</p>
              <p>{item.employee_id}</p>
              <p className="text-sm text-gray-600">{item.timestamp}</p>
            </div>
          ))}
        </div>
        <button
          onClick={clearHistory}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Clear History
        </button>
      </div>
    )
  );
};

export default SearchHistory;
