import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ModuleForm from '../components/ModuleForm';

const AdminModules = () => {
  const [modules, setModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get('/api/modulos');
        setModules(response.data);
      } catch (error) {
        toast.error('Error al cargar módulos');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, [modules]);

  const handleSubmit = async (formData) => {
    try {
      let response;
      
      if (currentModule) {
        // Update
        response = await api.put(`/api/modulos/${currentModule.CODMODULO}`, formData);
        setModules(modules.map(m => 
          m.CODMODULO === currentModule.CODMODULO ? response.data : m
        ));
        toast.success('Módulo actualizado');
      } else {
        // Create
        response = await api.post('/api/modulos', formData);
        setModules([...modules, response.data]);
        toast.success('Módulo creado');
      }
      
      setShowForm(false);
      setCurrentModule(null);
    } catch (error) {
      toast.error('Error al guardar módulo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este módulo?')) {
      try {
        await api.delete(`/api/modulos/${id}`);
        setModules(modules.filter(m => m.CODMODULO !== id));
        toast.success('Módulo eliminado');
      } catch (error) {
        toast.error('Error al eliminar módulo');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrar Módulos</h1>
        <button
          onClick={() => {
            setCurrentModule(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Nuevo Módulo
        </button>
      </div>
      
      {showForm && (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
          <ModuleForm 
            module={currentModule}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setCurrentModule(null);
            }}
          />
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-blue-100">
            <thead>
              <tr className="bg-gray-200 text-blue-700">
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Actividad</th>
                <th className="py-3 px-4 text-left">Docente</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {modules.map(modulo => (
                <tr key={modulo.CODMODULO} className="hover:bg-blue-600">
                  <td className="py-3 px-4">{modulo.NOMMODULO}</td>
                  <td className="py-3 px-4">
                    {modulo.CODACTIVIDAD ? (
                      <Link 
                        to={`/actividades/${modulo.CODACTIVIDAD}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver actividad
                      </Link>
                    ) : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {modulo.CODDOCENTE ? (
                      <Link 
                        to={`/docentes/${modulo.CODDOCENTE}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver docente
                      </Link>
                    ) : 'N/A'}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => {
                        setCurrentModule(modulo);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(modulo.CODMODULO)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminModules;