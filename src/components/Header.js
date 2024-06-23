import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp, FaPlus, FaLink, FaUpload, FaRegListAlt } from 'react-icons/fa';

const Header = ({ onCreateModule, onCreateLink, onCreateUpload }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-black text-xl font-semibold">Course builder</h1>
        <div className="relative">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaPlus className="mr-2" /> Add {showDropdown ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
          </button>
          {showDropdown && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={onCreateModule}>
                <FaRegListAlt className="mr-2" /> Create module
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={onCreateLink}>
                <FaLink className="mr-2" /> Add a link
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={onCreateUpload}>
                <FaUpload className="mr-2" /> Upload
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
