import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await api.get(`/api/actividades/${id}`);
        setActivity(response.data);
      } catch (error) {
        toast.error('Error al cargar la actividad');
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!activity) return <div className="min-h-screen flex items-center justify-center">Actividad no encontrada</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <div className="mb-6">
          <Link to="/actividades" className="text-blue-600 hover:underline">
            &larr; Volver a actividades
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activity.image && (
            <img 
              src={`./uploads/actividades/${activity.image}`} 
              alt={activity.NOMACTIVIDAD} 
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">{activity.NOMACTIVIDAD}</h1>
            <p className="text-blue-500 mb-4">{new Date(activity.FECACTIVIDAD).toLocaleDateString()}</p>
            <p className="text-lg mb-4">{activity.SHORTDESCRIPTION} hola</p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Descripción</h2>
              <p className="text-blue-700">{activity.DESCRIPCION}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700">Tipo de Actividad</h3>
                <p>{activity.TIPACTIVIDAD}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700">Certificado</h3>
                <p>{activity.CERTIFICADO ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;