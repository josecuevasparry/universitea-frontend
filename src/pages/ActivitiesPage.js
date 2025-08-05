import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityType, setActivityType] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let url = '/api/actividades?';
        if (searchTerm) url += `search=${searchTerm}&`;
        if (activityType !== 'all') url += `type=${activityType}&`;

        const response = await api.get(url);
        setActivities(response.data);
      } catch (error) {
        toast.error('Error al cargar actividades');
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [searchTerm, activityType]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Actividades</h1>
          <p className="text-gray-600">Explora nuestras actividades educativas</p>
        </div>
        
        {user?.role === 'admin' && (
          <Link
            to="/admin/activities/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Nueva Actividad
          </Link>
        )}
      </div>

      {/* Simplified Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Buscar actividades..."
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <option value="all">Todos los tipos</option>
            <option value="1">Talleres</option>
            <option value="2">Seminarios</option>
            <option value="3">Conferencias</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.CODACTIVIDAD} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {activity.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.NOMACTIVIDAD}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{activity.NOMACTIVIDAD}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activity.TIPACTIVIDAD === '1' ? 'Taller' : activity.TIPACTIVIDAD === '2' ? 'Seminario' : 'Conferencia'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2 line-clamp-2">{activity.SHORTDESCRIPTION}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {formatDate(activity.FECACTIVIDAD)}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/activities/${activity.CODACTIVIDAD}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalles
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to={`/admin/activities/edit/${activity.CODACTIVIDAD}`}
                      className="text-gray-600 hover:text-gray-800 ml-4"
                    >
                      Editar
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;