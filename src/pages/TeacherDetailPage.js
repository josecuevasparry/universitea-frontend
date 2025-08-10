import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const TeacherDetailPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teacher data
        const teacherResponse = await api.get(`/api/docentes/${id}`);
        setTeacher(teacherResponse.data);
        
        // Fetch modules taught by this teacher
        const modulesResponse = await api.get('/api/modulos/');
        const teacherModules = modulesResponse.data.filter(
          module => module.CODDOCENTE === id
        );
        setModules(teacherModules);
      } catch (error) {
        toast.error('Error al cargar el docente');
        console.error('Error fetching teacher:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!teacher) return <div className="min-h-screen flex items-center justify-center">Docente no encontrado</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <div className="mb-6">
          <Link to="/docentes" className="text-blue-600 hover:underline">
            &larr; Volver a docentes
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
                <img 
                  src={`https://caminantes.cl/centro/images/guia/${teacher.CODDOCENTE}.jpg`} 
                  alt={teacher.NOMDOCENTE} 
                  className="w-full rounded-lg shadow-md"
                />
              <div className="mt-4">
                <h2 className="text-xl font-bold text-blue-700">Información de contacto</h2>
                <p className="text-blue-600 mt-2">{teacher.EMAIL}</p>
                <p className="text-blue-600">{teacher.TELEFONO}</p>
                <p className="text-blue-600">RUT: {teacher.RUTDOCENTE}</p>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">{teacher.NOMDOCENTE}</h1>
              <p className="text-xl text-blue-600 mb-4">{teacher.ESPECIALIDAD}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Currículum</h2>
                <p className="text-blue-700 whitespace-pre-line">{teacher.CVDOCENTE}</p>
              </div>
              
              {modules.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Módulos que imparte</h2>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <Link 
                        key={module.CODMODULO} 
                        to={`/modulos/${module.CODMODULO}`}
                        className="block bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <h3 className="font-bold text-blue-700">{module.NOMMODULO}</h3>
                        <p className="text-blue-600 line-clamp-2">{module.CONTENIDOS}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailPage;