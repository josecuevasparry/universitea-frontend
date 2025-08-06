import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DocentesPage = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await api.get('/api/docentes');
        setDocentes(response.data);
      } catch (error) {
        console.error('Error fetching docentes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Nuestros Docentes</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docentes.map(docente => (
            <div key={docente.CODDOCENTE} className="bg-purple-100 rounded-lg shadow-md overflow-hidden">
              {docente.image && (
                <img 
                  src={docente.image} 
                  alt={docente.NOMDOCENTE} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{docente.NOMDOCENTE}</h2>
                <p className="text-gray-600 mb-2">{docente.ESPECIALIDAD}</p>
                <Link 
                  to={`/docentes/${docente.CODDOCENTE}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocentesPage;