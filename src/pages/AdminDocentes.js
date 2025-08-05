import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import DocenteForm from '../components/DocenteForm';

const AdminDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDocente, setCurrentDocente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await api.get('/api/docentes');
        setDocentes(response.data);
      } catch (error) {
        toast.error('Error al cargar docentes');
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      let response;
      
      if (currentDocente) {
        // Update
        response = await api.put(`/api/docentes/${currentDocente.CODDOCENTE}`, formData);
        setDocentes(docentes.map(d => 
          d.CODDOCENTE === currentDocente.CODDOCENTE ? response.data : d
        ));
        toast.success('Docente actualizado');
      } else {
        // Create
        response = await api.post('/api/docentes', formData);
        setDocentes([...docentes, response.data]);
        toast.success('Docente creado');
      }
      
      setShowForm(false);
      setCurrentDocente(null);
    } catch (error) {
      toast.error('Error al guardar docente');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este docente?')) {
      try {
        await api.delete(`/api/docentes/${id}`);
        setDocentes(docentes.filter(d => d.CODDOCENTE !== id));
        toast.success('Docente eliminado');
      } catch (error) {
        toast.error('Error al eliminar docente');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrar Docentes</h1>
        <button
          onClick={() => {
            setCurrentDocente(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Nuevo Docente
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <DocenteForm 
            docente={currentDocente}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setCurrentDocente(null);
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
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Especialidad</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {docentes.map(docente => (
                <tr key={docente.CODDOCENTE} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{docente.NOMDOCENTE}</td>
                  <td className="py-3 px-4">{docente.ESPECIALIDAD}</td>
                  <td className="py-3 px-4">{docente.EMAIL}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => {
                        setCurrentDocente(docente);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(docente.CODDOCENTE)}
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

export default AdminDocentes;