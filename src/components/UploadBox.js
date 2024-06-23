import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';

const UploadBox = ({ upload, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <div className="flex items-center justify-between bg-white border-t border-gray-200 p-4 w-full">
      <div className="flex items-center gap-4">
        <FaFilePdf size={24} />
        <span>{upload.name}</span>
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
              onClick={() => onEdit(upload)}
            >
              Edit Upload
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onDelete(upload)}
            >
              Delete Upload
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
