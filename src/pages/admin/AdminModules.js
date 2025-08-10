import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminModules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get('/api/modulos');
        setModules(response.data);
      } catch (error) {
        toast.error('Error al cargar módulos');
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const toggleArchive = async (id, currentStatus) => {
    try {
      await api.patch(`/api/modulos/${id}`, { archived: !currentStatus });
      setModules(modules.map(mod => 
        mod.CODMODULO === id ? { ...mod, archived: !currentStatus } : mod
      ));
      toast.success('Estado actualizado');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  const filteredModules = modules.filter(module =>
    module.NOMMODULO.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Gestión de Módulos</h1>
          <Link 
            to="/admin/modulos/nuevo" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Nuevo Módulo
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar módulos..."
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
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Contenidos</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredModules.map((module) => (
                  <tr key={module.CODMODULO} className="border-t">
                    <td className="px-6 py-4">{module.NOMMODULO}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{module.CONTENIDOS}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${module.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {module.archived ? 'Archivado' : 'Activo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/modulos/editar/${module.CODMODULO}`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => toggleArchive(module.CODMODULO, module.archived)}
                        className="text-blue-600 hover:underline"
                      >
                        {module.archived ? 'Activar' : 'Archivar'}
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

export default AdminModules;