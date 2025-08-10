import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/api/actividades');
        // Assuming your API returns 'archived' status directly,
        // otherwise, you might need to map it from another field.
        setActivities(response.data);
      } catch (error) {
        toast.error('Error al cargar actividades');
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const toggleArchive = async (id, currentStatus) => {
    try {
      await api.patch(`/api/actividades/${id}`, { archived: !currentStatus });
      setActivities(activities.map(act =>
        act.CODACTIVIDAD === id ? { ...act, archived: !currentStatus } : act
      ));
      toast.success(`Actividad ${!currentStatus ? 'archivada' : 'activada'} correctamente.`);
    } catch (error) {
      toast.error('Error al actualizar el estado de la actividad.');
      console.error('Error updating activity status:', error);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.NOMACTIVIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8"> {/* Added padding for smaller screens */}
      <div className="container mx-auto px-0 py-4"> {/* Removed px-4 and py-8 here as it's handled by parent */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> {/* Added gap and flex-col for mobile */}
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 text-center sm:text-left">
            Gestión de Actividades
          </h1>
          <Link
            to="/admin/actividades/nuevo"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center" // Added w-full for mobile button
          >
            + Nueva Actividad
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar actividades por nombre..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 transition duration-200" // Improved styling
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center text-lg text-blue-600 py-8">Cargando actividades...</div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center text-lg text-blue-500 py-8">No se encontraron actividades.</div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredActivities.map((activity) => (
                    <tr key={activity.CODACTIVIDAD} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-md text-blue-900 font-medium">{activity.NOMACTIVIDAD}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-blue-700">
                        {new Date(activity.FECACTIVIDAD).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {activity.archived ? 'Archivado' : 'Activo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium space-x-3">
                        <Link
                          to={`/admin/actividades/editar/${activity.CODACTIVIDAD}`}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => toggleArchive(activity.CODACTIVIDAD, activity.archived)}
                          className={`font-medium ${activity.archived ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'} transition-colors`}
                        >
                          {activity.archived ? 'Activar' : 'Archivar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden"> {/* Visible on mobile, grid layout */}
              {filteredActivities.map((activity) => (
                <div key={activity.CODACTIVIDAD} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-blue-700">{activity.NOMACTIVIDAD}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${activity.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {activity.archived ? 'Archivado' : 'Activo'}
                    </span>
                  </div>
                  <p className="text-md text-blue-600 mb-2">
                    <span className="font-semibold">Fecha:</span>{' '}
                    {new Date(activity.FECACTIVIDAD).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <div className="flex justify-end space-x-3 mt-4">
                    <Link
                      to={`/admin/actividades/editar/${activity.CODACTIVIDAD}`}
                      className="text-blue-600 hover:text-blue-900 transition-colors text-md font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => toggleArchive(activity.CODACTIVIDAD, activity.archived)}
                      className={`text-md font-medium ${activity.archived ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'} transition-colors`}
                    >
                      {activity.archived ? 'Activar' : 'Archivar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminActivities;