import React from 'react';

const AdminPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 shadow-lg p-4">
          <nav>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-700 font-semibold hover:text-gray-900">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 font-semibold hover:text-gray-900">
                  Users
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 font-semibold hover:text-gray-900">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-50">
          {/* Blank Admin Content Area */}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
