import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ModuleDetail = () => {
  const { id } = useParams();
  const [modulo, setModulo] = useState(null);
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/modulos/${id}`);
        setModulo(response.data.modulo);
        setDocente(response.data.docente);
      } catch (error) {
        console.error('Error fetching module:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  if (!modulo) {
    return <div className="p-8 text-red-600">Módulo no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{modulo.NOMMODULO}</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Contenidos</h2>
          <div className="whitespace-pre-line">{modulo.CONTENIDOS}</div>
        </div>

        {modulo.image && (
          <div className="mb-6">
            <img 
              src={modulo.image} 
              alt={modulo.NOMMODULO} 
              className="max-w-full h-auto rounded"
            />
          </div>
        )}

        {docente && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Docente</h2>
            <div className="flex items-center space-x-4">
              {docente.image && (
                <img 
                  src={docente.image} 
                  alt={docente.NOMDOCENTE} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-medium">{docente.NOMDOCENTE}</h3>
                <p className="text-gray-600 text-sm">{docente.ESPECIALIDAD}</p>
                <Link 
                  to={`/docentes/${docente.CODDOCENTE}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Ver perfil
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;