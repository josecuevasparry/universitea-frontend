import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get('/api/modulos');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Listado de Módulos</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map(modulo => (
            <div key={modulo.CODMODULO} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{modulo.NOMMODULO}</h2>
                  <p className="text-gray-600 line-clamp-2">{modulo.CONTENIDOS}</p>
                </div>
                <Link 
                  to={`/modules/${modulo.CODMODULO}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ver
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModulesPage;