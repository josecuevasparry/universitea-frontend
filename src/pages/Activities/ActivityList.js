import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  format 
} from 'date-fns';
import { es } from 'date-fns/locale';
import actividadService from '../../api/actividades';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  CloudOff as OfflineIcon
} from '@mui/icons-material';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await actividadService.getActivities();
      setActivities(response);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Error al cargar las actividades');
      // Optionally load cached data here for offline use
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 flex items-center"
          onClick={fetchActivities}
        >
          <RefreshIcon className="mr-2" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold flex items-center">
          Actividades
          {!isOnline && (
            <button className="ml-2 text-yellow-500" title="Modo offline">
              <OfflineIcon fontSize="small" />
            </button>
          )}
        </h1>
        
        <div className="flex items-center">
          <Link 
            to="/actividades/new" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center sm:px-4 sm:py-2"
          >
            <AddIcon className="mr-1" />
            <span className="hidden sm:inline">Nueva Actividad</span>
            <span className="sm:hidden">Nueva</span>
          </Link>
          
          <button 
            onClick={fetchActivities}
            className="ml-2 text-blue-500 hover:text-blue-700"
            aria-label="Recargar"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      
      {activities.length === 0 ? (
        <div className="bg-white p-5 rounded shadow text-center">
          <p>No hay actividades registradas</p>
          <Link 
            to="/actividades/new" 
            className="mt-2 inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
          >
            Crear primera actividad
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase traing-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.CODACTIVIDAD} className="hover:bg-gray-50">
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.CODACTIVIDAD}</td>
                    <td className="sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.NOMACTIVIDAD}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(activity.FECINICIO), 'dd MMM yyyy', { locale: es })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <Link 
                        to={`/actividades/${activity.CODACTIVIDAD}`}
                        className={`${window.innerWidth < 640 ? 'text-blue-500' : 'border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50'} inline-flex items-center`}
                      > 
                        {window.innerWidth < 640 ? <ViewIcon /> : 'Ver'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityList;