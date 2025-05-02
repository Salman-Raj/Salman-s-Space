import React, { useState } from 'react';
import { Search, PlusCircle, MenuIcon, X } from 'lucide-react';
import { useIssues } from '../context/IssueContext';
import NewIssueModal from './NewIssueModal';

const Header: React.FC = () => {
  const { setSearchTerm } = useIssues();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-700">My Portfolio</h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full max-w-lg relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search issues, keywords, titles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <PlusCircle size={18} className="mr-1" />
              <span className="hidden sm:inline">New Issue</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-500" />
              ) : (
                <MenuIcon size={24} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Shows when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search issues..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
          </div>
        )}
      </div>

      {isModalOpen && <NewIssueModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;