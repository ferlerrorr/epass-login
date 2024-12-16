import React, { useState } from 'react';

const SettingsText: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storeCode, setStoreCode] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');

  const storeOptions = [
    'Store 001',
    'Store 002',
    'Store 003',
    // Add more store options as needed
  ];

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleSave = () => {
    if (storeCode && userName && employeeId) {
      const dataToSave = {
        store_code: storeCode,
        user_name: userName,
        employee_id: employeeId,
      };
      localStorage.setItem('settings', JSON.stringify(dataToSave));
      closeModal(); // Close modal after saving
    } else {
      alert('Please fill all fields before saving.');
    }
  };

  const handleReset = () => {
    setStoreCode(null);
    setUserName('');
    setEmployeeId('');
  };

  return (
    <div>
      <button onClick={openModal} className="px-4 py-2 text-white bg-blue-500 rounded">
        Settings
      </button>

      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 box-border z-50">
            <h2 className="text-black text-xl font-semibold mb-4">Settings</h2>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-700">Store Code</label>
              <div className="flex items-center">
                <input
                  type="text"
                  list="storeOptions"
                  value={storeCode || ''}
                  onChange={(e) => setStoreCode(e.target.value)}
                  placeholder="Search store code..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSave}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleReset}
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-700">User Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-700">Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter employee ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsText;
