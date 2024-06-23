import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';

const LinkBox = ({ link, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <div className="flex items-center justify-between bg-white border-t border-gray-200 p-4 rounded-md mb-4">
      <div className="flex items-center gap-4">
        <IoIosLink size={24} />
        <div>
          <span>{link.name}</span>
          <p className="text-sm text-gray-500">{link.url}</p>
        </div>
      </div>
      <div className="relative">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onEdit(link)}
            >
              Edit Link
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onDelete(link)}
            >
              Delete Link
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LinkBox;
