import { useState } from 'react';
import moduloService from '../../api/modulos';

function ModuleForm({ initialData, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    contenidos: '',
    imgSrc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isEditMode = Boolean(initialData?.CODMODULO);
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
      if (isEditMode) {
        await moduloService.updateModule(initialData.CODMODULO, formData);
      } else {
        await moduloService.createModule(formData);
      }
      onSuccess();
    } catch (err) {
      console.log(error)
      setError(err.message || `Error ${isEditMode ? 'updating' : 'creating'} module`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {isEditMode ? 'Edit Module' : 'Create New Module'}
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
            value={formData.contenidos|| ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            className={`px-4 py-2 ${
              isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-md transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting 
              ? isEditMode 
                ? 'Updating...' 
                : 'Creating...'
              : isEditMode
                ? 'Update Module'
                : 'Create Module'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModuleForm;