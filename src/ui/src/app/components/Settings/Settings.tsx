import React, { useState, useEffect } from 'react';

const SettingsText: React.FC = () => {
  type StoreCode = 'Store 001' | 'Store 002' | 'Store 003';

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storeCode, setStoreCode] = useState<StoreCode | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [isStoreCodeSaved, setIsStoreCodeSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeData: Record<StoreCode, { users: string[]; employees: string[] }> = {
    'Store 001': { users: ['Alice', 'Bob'], employees: ['E001', 'E002'] },
    'Store 002': { users: ['Charlie', 'Daisy'], employees: ['E003', 'E004'] },
    'Store 003': { users: ['Eve', 'Frank'], employees: ['E005', 'E006'] },
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const { store_code, user_name, employee_id } = JSON.parse(savedSettings);
      setStoreCode(store_code as StoreCode);
      setUserName(user_name);
      setEmployeeId(employee_id);
      setIsStoreCodeSaved(!!store_code);
    }
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setError(null);
    setModalIsOpen(false);
  };

  const handleSaveStoreCode = () => {
    if (!storeCode) {
      setError('Store code is required.');
      return;
    }
    setError(null);
    localStorage.setItem('storeCode', JSON.stringify({ store_code: storeCode }));
    setIsStoreCodeSaved(true);
  };

  const handleSaveAll = () => {
    if (!storeCode || !userName || !employeeId) {
      setError('All fields are required.');
      return;
    }
    setError(null);
    const dataToSave = { store_code: storeCode, user_name: userName, employee_id: employeeId };
    localStorage.setItem('settings', JSON.stringify(dataToSave));
    closeModal();
  };

  const handleReset = () => {
    setStoreCode(null);
    setUserName(null);
    setEmployeeId(null);
    setIsStoreCodeSaved(false);
    localStorage.removeItem('settings');
  };

  // Handle User Name Selection
  const handleUserNameChange = (selectedUserName: string) => {
    if (storeCode) {
      const userIndex = storeData[storeCode].users.indexOf(selectedUserName);
      if (userIndex !== -1) {
        setUserName(selectedUserName);
        setEmployeeId(storeData[storeCode].employees[userIndex]); // Auto-select corresponding Employee ID
      }
    }
  };

  // Handle Employee ID Selection
  const handleEmployeeIdChange = (selectedEmployeeId: string) => {
    if (storeCode) {
      const employeeIndex = storeData[storeCode].employees.indexOf(selectedEmployeeId);
      if (employeeIndex !== -1) {
        setEmployeeId(selectedEmployeeId);
        setUserName(storeData[storeCode].users[employeeIndex]);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} className="px-4 py-2 text-white fixed" style={{ top: '5px',right:"0" }}>
        Settings
      </button>

      {modalIsOpen && (
        <div
          role="dialog"
          aria-labelledby="settings-title"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 box-border z-50">
            <h2 id="settings-title" className="text-black text-xl font-semibold mb-4">Settings</h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Store Code Section */}
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-700">Store Code</label>
              <div className="flex items-center">
                <input
                  type="text"
                  list="storeOptions"
                  value={storeCode || ''}
                  onChange={(e) => {
                    const value = e.target.value as StoreCode;
                    setStoreCode(value);
                    setUserName(null);
                    setEmployeeId(null);
                    setIsStoreCodeSaved(false);
                  }}
                  placeholder="Search store code..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2" 
                  />
                <datalist id="storeOptions">
                  {Object.keys(storeData).map((store) => (
                    <option key={store} value={store} />
                  ))}
                </datalist>
                <button
                  onClick={handleSaveStoreCode}
                  className="ml-2 px-4 py-2 bg-deepBlue  text-white rounded-lg hover:bg-blue-600"
                >
                  Save Code
                </button>
                <button
                  onClick={handleReset}
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* User Name Section */}
            <div className="mb-4">
              <label className="block mb-2 text-sm text-gray-700">User Name</label>
              <select
                value={userName || ''}
                onChange={(e) => handleUserNameChange(e.target.value)}
                disabled={!isStoreCodeSaved}
                className={`w-full px-4 py-2 border ${
                  isStoreCodeSaved ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                } rounded-lg text-black focus:outline-none focus:ring-2 ${
                  isStoreCodeSaved ? 'focus:ring-blue-500' : ''
                }`}
              >
                <option value="" disabled>
                  {isStoreCodeSaved ? 'Select a User Name' : 'Save Store Code First'}
                </option>
                {storeCode &&
                  storeData[storeCode].users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
              </select>
            </div>

            {/* Employee ID Section */}
            <div className="mb-6">
              <label className="block mb-2 text-sm text-gray-700">Employee ID</label>
              <select
                value={employeeId || ''}
                onChange={(e) => handleEmployeeIdChange(e.target.value)}
                disabled={!isStoreCodeSaved}
                className={`w-full px-4 py-2 border ${
                  isStoreCodeSaved ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                } rounded-lg text-black focus:outline-none focus:ring-2 ${
                  isStoreCodeSaved ? 'focus:ring-blue-500' : ''
                }`}
              >
                <option value="" disabled>
                  {isStoreCodeSaved ? 'Select an Employee ID' : 'Save Store Code First'}
                </option>
                {storeCode &&
                  storeData[storeCode].employees.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
              </select>
            </div>

            {/* Save All and Close Buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={!isStoreCodeSaved}
                className={`px-4 py-2 ${
                  isStoreCodeSaved ? 'bg-deepBlue  text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700'
                } rounded-lg`}
              >
                Save All
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
