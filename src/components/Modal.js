import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { FaFilePdf } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onCreate, onEdit, itemToEdit, isModule, isLink }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      if (isLink) {
        setUrl(itemToEdit.url || '');
      }
    } else {
      setName('');
      setUrl('');
    }
  }, [itemToEdit, isLink]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (itemToEdit) {
      onEdit(itemToEdit, name, url);
    } else {
      onCreate(name, url);
    }
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md relative" style={{ width: '480px', height: isModule || isLink ? '292px' : '400px', borderRadius: '12px' }}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 font-bold">
          {itemToEdit ? (isModule ? 'Edit module' : isLink ? 'Edit link' : 'Edit upload') : (isModule ? 'Create new module' : isLink ? 'Add new link' : 'Upload PDF')}
        </h2>
        {isModule || isLink ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">{isModule ? 'Module name' : 'Display name'}</label>
            <input
              type="text"
              placeholder={isModule ? 'Module name' : 'Display name'}
              className="border border-gray-300 p-2 w-full mb-4 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <FaFilePdf size={24} className="mr-2" />
              <div>
                <span className="text-lg font-semibold">{name || 'PDF File'}</span>
                <p className="text-sm text-gray-500">This is a PDF file</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">Display name</label>
            <input
              type="text"
              placeholder="Display name"
              className="border border-gray-300 p-2 w-full mb-4 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isModule && !isLink && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">Upload PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="border border-gray-300 p-2 w-full mb-4 rounded-md"
                  onChange={handleFileChange}
                />
              </>
            )}
          </>
        )}
        {isLink && (
          <>
            <div className="flex items-center mb-4">
              <IoIosLink size={24} className="mr-2" />
              <div>
                <span className="text-lg font-semibold">Link</span>
                <p className="text-sm text-gray-500">This is a Link</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">URL</label>
            <input
              type="text"
              placeholder="URL"
              className="border border-gray-300 p-2 w-full mb-4 rounded-md"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </>
        )}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md"
            style={{
              width: '83px',
              height: '48px',
              borderRadius: '8px',
              padding: '13px 16px',
              borderWidth: '1px',
              borderColor: '#EBEBEB',
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#008392] text-white px-4 py-2 rounded-md"
            style={{
              width: '82px',
              height: '48px',
              borderRadius: '8px',
              padding: '13px 16px',
            }}
            onClick={handleSubmit}
          >
            {itemToEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
