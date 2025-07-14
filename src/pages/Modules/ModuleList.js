import { useEffect, useState } from "react";
import moduloService from '../../api/modulos';
import ModuleForm from './ModuleForm';
import ModuleCard from './ModuleCard';

function ModuleList() {
  const [modules, setModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data = await moduloService.getModules();
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowForm(false);
    fetchModules();
  };

  const handleUpdateSuccess = () => {
    setEditingModule(null);
    fetchModules();
  };

  const handleEditModule = (module) => {
    setEditingModule(module);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl andres">
    <img src="./logouniversitea4.png" alt="Universitea" className="w-1/2 lg:w-1/3 mx-auto"></img>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Módulos de Aprendizaje</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Crear Nuevo Módulo
        </button>
      </div>

      {showForm && (
        <ModuleForm 
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingModule && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar Módulo</h3>
          <ModuleForm 
            initialData={editingModule}
            onSuccess={handleUpdateSuccess}
            onCancel={() => setEditingModule(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : modules.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No hay módulos creados
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors block mx-auto"
          >
            Crear Primer Módulo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(module => (
            <ModuleCard 
              key={module.CODMODULO} 
              module={module} 
              onUpdate={fetchModules}
              onEdit={() => handleEditModule(module)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ModuleList;