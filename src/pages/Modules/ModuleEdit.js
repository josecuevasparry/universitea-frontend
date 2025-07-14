import { useState, useEffect } from 'react';
import moduloService from '../../api/modulos';

function ModuleEdit({ moduleId, onSuccess, onCancel }) {

  const [formData, setFormData] = useState({
    titulo: '',
    contenidos: '',
    modalidad: '',
    imgSrc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load module data when component mounts or moduleId changes
  useEffect(() => {
    console.log(moduleId)
    if (moduleId) {
      const fetchModule = async () => {
        setIsLoading(true);
        try {
          const module = await moduloService.getModuleById(moduleId);
          setFormData({
            titulo: module.titulo || '',
            contenidos: module.contenidos || '',
            modalidad: module.modalidad || '',
            imgSrc: module.imgSrc || ''
          });
        } catch (err) {
          setError(err.message || 'Error loading module');
        } finally {
          setIsLoading(false);
        }
      };
      fetchModule();
    }
  }, [moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (moduleId) {
        console.log(moduleId)
        // Update existing module
        await moduloService.updateModule(moduleId, formData);
      } else {
        // Create new module
        await moduloService.createModule(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message || `Error ${moduleId ? 'updating' : 'creating'} module`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {moduleId ? 'Edit Module' : 'Create New Module'}
      </h3>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="contenidos"
            value={formData.contenidos}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Modality</label>
          <select
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select...</option>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          {formData.imgSrc && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img 
                src={formData.imgSrc} 
                alt="Preview" 
                className="h-32 object-cover rounded-md border border-gray-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+not+found';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting 
              ? (moduleId ? 'Updating...' : 'Creating...') 
              : (moduleId ? 'Update Module' : 'Create Module')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModuleEdit;