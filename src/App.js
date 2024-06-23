import React, { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import ModuleBox from './components/ModuleBox';
import LinkBox from './components/LinkBox.js';
import UploadBox from './components/UploadBox';
import centerSVG from './center.svg';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [links, setLinks] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isModule, setIsModule] = useState(true);
  const [isLink, setIsLink] = useState(false);

  const handleCreateModule = () => {
    setItemToEdit(null);
    setIsModule(true);
    setIsLink(false);
    setIsModalOpen(true);
  };

  const handleCreateLink = () => {
    setItemToEdit(null);
    setIsModule(false);
    setIsLink(true);
    setIsModalOpen(true);
  };

  const handleCreateUpload = () => {
    setItemToEdit(null);
    setIsModule(false);
    setIsLink(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = (name, url) => {
    if (isModule) {
      setModules([...modules, { name }]);
    } else if (isLink) {
      setLinks([...links, { name, url }]);
    } else {
      setUploads([...uploads, { name, url }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (item, newName, newUrl) => {
    if (isModule) {
      setModules(modules.map(m => m === item ? { ...m, name: newName } : m));
    } else if (isLink) {
      setLinks(links.map(l => l === item ? { ...l, name: newName, url: newUrl } : l));
    } else {
      setUploads(uploads.map(u => u === item ? { ...u, name: newName, url: newUrl } : u));
    }
    setIsModalOpen(false);
  };

  const handleEditItem = (item, isModule, isLink) => {
    setItemToEdit(item);
    setIsModule(isModule);
    setIsLink(isLink);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (item, isModule, isLink) => {
    if (isModule) {
      setModules(modules.filter(m => m !== item));
    } else if (isLink) {
      setLinks(links.filter(l => l !== item));
    } else {
      setUploads(uploads.filter(u => u !== item));
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Header onCreateModule={handleCreateModule} onCreateLink={handleCreateLink} onCreateUpload={handleCreateUpload} />
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onCreate={handleCreate} 
        onEdit={handleEdit} 
        itemToEdit={itemToEdit} 
        isModule={isModule} 
        isLink={isLink} 
      />
      <div className="flex flex-col items-center w-full max-w-4xl mt-16">
        {modules.length > 0 || links.length > 0 || uploads.length > 0 ? (
          <div className="w-full" style={{ border: '1px solid #EBEBEB' }}>
            {modules.map((module, index) => (
              <ModuleBox 
                key={index} 
                module={module} 
                onEdit={() => handleEditItem(module, true, false)} 
                onDelete={() => handleDeleteItem(module, true, false)} 
              />
            ))}
            {links.map((link, index) => (
              <LinkBox 
                key={index} 
                link={link} 
                onEdit={() => handleEditItem(link, false, true)} 
                onDelete={() => handleDeleteItem(link, false, true)} 
              />
            ))}
            {uploads.map((upload, index) => (
              <UploadBox 
                key={index} 
                upload={upload} 
                onEdit={() => handleEditItem(upload, false, false)} 
                onDelete={() => handleDeleteItem(upload, false, false)} 
              />
            ))}
          </div>
        ) : (
          <img 
            src={centerSVG} 
            alt="Center SVG" 
            className="mt-12"
            style={{ width: '560px', height: '264px', marginTop: '100px' }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
