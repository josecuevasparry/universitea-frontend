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
        setActivities(response.data);
      } catch (error) {
        toast.error('Error al cargar actividades');
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
      toast.success('Estado actualizado');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.NOMACTIVIDAD.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-violet-800">Gestión de Actividades</h1>
          <Link 
            to="/admin/actividades/nuevo" 
            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
          >
            Nueva Actividad
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar actividades..."
            className="w-full p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div>Cargando...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-violet-100">
                <tr>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <tr key={activity.CODACTIVIDAD} className="border-t">
                    <td className="px-6 py-4">{activity.NOMACTIVIDAD}</td>
                    <td className="px-6 py-4">{new Date(activity.FECACTIVIDAD).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${activity.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {activity.archived ? 'Archivado' : 'Activo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/actividades/editar/${activity.CODACTIVIDAD}`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => toggleArchive(activity.CODACTIVIDAD, activity.archived)}
                        className="text-violet-600 hover:underline"
                      >
                        {activity.archived ? 'Activar' : 'Archivar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivities;