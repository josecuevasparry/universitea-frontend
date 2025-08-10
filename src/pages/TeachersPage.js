import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/api/docentes/');
        setTeachers(response.data);
      } catch (error) {
        toast.error('Error al cargar docentes');
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Nuestros Docentes</h1>
        
        {loading ? (
          <div className="flex justify-center">Cargando docentes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.CODDOCENTE} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={`https://caminantes.cl/centro/images/guia/${teacher.CODDOCENTE}.jpg`} 
                    alt={teacher.NOMDOCENTE} 
                    className="w-full h-64 object-cover"
                  />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-blue-700 mb-2">{teacher.NOMDOCENTE}</h2>
                  <p className="text-blue-600 mb-1"><span className="font-semibold">Especialidad:</span> {teacher.ESPECIALIDAD}</p>
                  <p className="text-blue-600 mb-4 line-clamp-2">{teacher.CVDOCENTE}</p>
                  <Link 
                    to={`/docentes/${teacher.CODDOCENTE}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersPage;