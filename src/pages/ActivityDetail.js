import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ActivityDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activity, setActivity] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true);
        const [activityRes] = await Promise.all([
          api.get(`/api/actividades/${id}`),
        ]
        );
        console.log(activityRes)
        setActivity(activityRes.data.actividad);
        setModules(activityRes.data.modulos);
      } catch (err) {
        setError('Error al cargar los detalles de la actividad');
        toast.error('No se pudo cargar la actividad');
        console.error('Error fetching activity details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-red-600">{error}</h2>
          <Link to="/activities" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            ← Volver a las actividades
          </Link>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-600">Actividad no encontrada</h2>
          <Link to="/activities" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            ← Volver a las actividades
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-6">
        <Link 
          to="/activities" 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Volver a actividades
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Activity Header */}
        <div className="relative">
          {activity.image && (
            <img 
              src={activity.image} 
              alt={activity.NOMACTIVIDAD}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-activity.jpg';
              }}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{activity.NOMACTIVIDAD}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90">
              <span>
                📅 {formatDate(activity.FECACTIVIDAD)}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {activity.TIPACTIVIDAD === '1' ? 'Taller' : 
                 activity.TIPACTIVIDAD === '2' ? 'Seminario' : 'Conferencia'}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{activity.DESCRIPCION}</p>

              {activity.CERTIFICADO && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Certificación</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">{activity.CERTIFICADO}</p>
                </>
              )}

              {activity.ENTREGABLE && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Material Entregable</h2>
                  <p className="text-gray-700 whitespace-pre-line">{activity.ENTREGABLE}</p>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Detalles</h3>
                <ul className="space-y-3">
                  <li>
                    <p className="text-sm text-gray-500">Fecha y hora</p>
                    <p>📅 {formatDate(activity.FECACTIVIDAD)}</p>
                  </li>
                  <li>
                    <p className="text-sm text-gray-500">Tipo de actividad</p>
                    <p>📚 {activity.TIPACTIVIDAD === '1' ? 'Taller' : 
                         activity.TIPACTIVIDAD === '2' ? 'Seminario' : 'Conferencia'}</p>
                  </li>
                </ul>

                {user?.role === 'admin' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      to={`/admin/activities/edit/${activity.CODACTIVIDAD}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Editar Actividad
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modules Section */}
        {modules.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-6">Módulos de la Actividad</h2>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.CODMODULO} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{module.NOMMODULO}</h3>
                      <p className="text-gray-600 mt-1">{module.DESCRIPCION}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ⏱️ {formatDuration(module.DURACION)}
                    </span>
                  </div>
                  {module.CODDOCENTE && (
                    <div className="mt-3">
                      <span className="text-sm text-gray-700">
                        👤 {module.CODDOCENTE.NOMDOCENTE || 'Docente no asignado'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;