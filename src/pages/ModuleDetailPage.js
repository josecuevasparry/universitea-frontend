import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ModuleDetailPage = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch module data
        const moduleResponse = await api.get(`/api/modulos/${id}`);
        setModule(moduleResponse.data);
        
        // Fetch teacher data if CODDOCENTE exists
        if (moduleResponse.data.CODDOCENTE) {
          const teacherResponse = await api.get(`/api/docentes/${moduleResponse.data.CODDOCENTE}`);
          setTeacher(teacherResponse.data);
        }
        
        // Fetch related activities
        const activitiesResponse = await api.get(`/api/modact/modulo/${id}`);
        const activitiesData = await Promise.all(
          activitiesResponse.data.map(async (modact) => {
            const activity = await api.get(`/api/actividades/${modact.CODACTIVIDAD}`);
            return activity.data;
          })
        );
        setActivities(activitiesData);
      } catch (error) {
        toast.error('Error al cargar el módulo');
        console.error('Error fetching module:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!module) return <div className="min-h-screen flex items-center justify-center">Módulo no encontrado</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <div className="mb-6">
          <Link to="/modulos" className="text-blue-600 hover:underline">
            &larr; Volver a módulos
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {module.image && (
            <img 
              src={`/uploads/${module.image}`} 
              alt={module.NOMMODULO} 
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">{module.NOMMODULO}</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Contenidos</h2>
              <p className="text-blue-700 whitespace-pre-line">{module.CONTENIDOS}</p>
            </div>
            
            {teacher && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Docente</h2>
                <div className="flex items-center">
                  {teacher.image && (
                    <img 
                      src={`/uploads/${teacher.image}`} 
                      alt={teacher.NOMDOCENTE} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-bold">{teacher.NOMDOCENTE}</h3>
                    <p className="text-blue-600">{teacher.ESPECIALIDAD}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Actividades relacionadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity) => (
                    <Link 
                      key={activity.CODACTIVIDAD} 
                      to={`/actividades/${activity.CODACTIVIDAD}`}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-bold text-blue-700">{activity.NOMACTIVIDAD}</h3>
                      <p className="text-blue-500 text-md">
                        {new Date(activity.FECACTIVIDAD).toLocaleDateString()}
                      </p>
                      <p className="text-blue-600 mt-2 line-clamp-2">{activity.SHORTDESCRIPTION}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;