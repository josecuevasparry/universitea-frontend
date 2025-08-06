import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const DocenteDetail = () => {
  const { id } = useParams();
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docenteRes, modulesRes] = await Promise.all([
          api.get(`/api/docentes/${id}`),
          api.get(`/api/docentes/${id}/modulos`)
        ]);
        setDocente(docenteRes.data);
        setModules(modulesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  if (!docente) {
    return <div className="p-8 text-red-600">Docente no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {docente.image && (
            <div className="md:w-1/3">
              <img 
                src={docente.image} 
                alt={docente.NOMDOCENTE} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl font-bold mb-2">{docente.NOMDOCENTE}</h1>
            <p className="text-gray-600 mb-4">{docente.ESPECIALIDAD}</p>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Información de Contacto</h2>
              <p>Email: {docente.EMAIL}</p>
              <p>Teléfono: {docente.TELEFONO}</p>
              <p>RUT: {docente.RUTDOCENTE}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Curriculum</h2>
              <p className="whitespace-pre-line">{docente.CVDOCENTE}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Módulos que imparte</h2>
        {modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map(modulo => (
              <div key={modulo.CODMODULO} className="bg-purple-100 p-4 rounded shadow">
                <h3 className="font-semibold">{modulo.NOMMODULO}</h3>
                <Link 
                  to={`/modulos/${modulo.CODMODULO}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Ver módulo
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Este docente no tiene módulos asignados.</p>
        )}
      </div>
    </div>
  );
};

export default DocenteDetail;