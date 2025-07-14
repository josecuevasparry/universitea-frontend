import { useState } from 'react';
import moduloService from '../../api/modulos';


const ModuleCard = ({ module, onUpdate, onEdit }) => {  // Added onEdit to props destructuring
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...module });

  const toggleExpand = () => {
    if (!isEditing) {
      setExpanded(!expanded);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(); // Call the onEdit prop if it exists
    } else {
      setIsEditing(true); // Fallback to inline editing
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...module });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await moduloService.updateModule(module.CODMODULO, formData);
      if (onUpdate) onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white relative"
    >
      {/* Edit/Save controls */}
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleCancelEdit}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
              aria-label="Cancel edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button
              onClick={handleSubmit}
              className="p-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors"
              aria-label="Save changes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition-colors"
            aria-label="Edit module"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
      </div>

      {/* Module Content - switches between view and edit modes */}
      {isEditing ? (
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleFieldChange}
              className="w-full px-3 py-2 text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="h-48 bg-gray-100 overflow-hidden mb-4">
            <img 
              src={formData.imgSrc} 
              alt={formData.titulo}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x200?text=Module+Image';
              }}
            />
            <input
              type="text"
              name="imgSrc"
              value={formData.imgSrc}
              onChange={handleFieldChange}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded mt-1"
              placeholder="Image URL"
            />
          </div>

          <div className="mb-4">
            <textarea
              name="contenidos"
              value={formData.contenidos}
              onChange={handleFieldChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={expanded ? 6 : 3}
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 text-sm font-bold mr-2">Modalidad:</label>
            <select
              name="modalidad"
              value={formData.modalidad}
              onChange={handleFieldChange}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Presencial">Presencial</option>
              <option value="Online">Online</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          {module.certificados && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Certificates:</span> {module.certificados}
            </div>
          )}
        </form>
      ) : (
        <>
          <h1 
            className="text-center text-2xl p-4 bg-gray-50 cursor-pointer"
            onClick={toggleExpand}
          >
            {module.titulo}
          </h1>
          
          <div 
            className="h-48 bg-gray-100 overflow-hidden cursor-pointer"
            onClick={toggleExpand}
          >
            <img 
              src={module.imgSrc} 
              alt={module.titulo}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x200?text=Module+Image';
              }}
            />
          </div>
          
          <div 
            className="p-4 cursor-pointer"
            onClick={toggleExpand}
          >
            <div className="relative">
              <div className={`text-gray-600 mb-3 overflow-hidden ${expanded ? '' : 'line-clamp-2'}`}>
                {module.contenidos}
              </div>
              {!expanded && (
                <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white to-transparent w-1/3 h-6"></div>
              )}
            </div>
            
            <div className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Modalidad:</span> {module.modalidad}
            </div>
            
            {module.certificados && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Certificates:</span> {module.certificados}
              </div>
            )}
            
            <div className="text-sm text-blue-500 mt-2">
              {expanded ? 'Cerrar' : 'Más...'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModuleCard;