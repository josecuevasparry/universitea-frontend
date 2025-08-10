import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/api/docentes');
        setTeachers(response.data);
      } catch (error) {
        toast.error('Error al cargar docentes');
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const toggleArchive = async (id, currentStatus) => {
    try {
      await api.patch(`/api/docentes/${id}`, { archived: !currentStatus });
      setTeachers(teachers.map(teacher => 
        teacher.CODDOCENTE === id ? { ...teacher, archived: !currentStatus } : teacher
      ));
      toast.success('Estado actualizado');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.NOMDOCENTE.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Gestión de Docentes</h1>
          <Link 
            to="/admin/docentes/nuevo" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Nuevo Docente
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar docentes..."
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
                  <th className="px-6 py-3 text-left">Especialidad</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.CODDOCENTE} className="border-t">
                    <td className="px-6 py-4">{teacher.NOMDOCENTE}</td>
                    <td className="px-6 py-4">{teacher.ESPECIALIDAD}</td>
                    <td className="px-6 py-4">{teacher.EMAIL}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${teacher.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {teacher.archived ? 'Archivado' : 'Activo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link
                        to={`/admin/docentes/editar/${teacher.CODDOCENTE}`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => toggleArchive(teacher.CODDOCENTE, teacher.archived)}
                        className="text-blue-600 hover:underline"
                      >
                        {teacher.archived ? 'Activar' : 'Archivar'}
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

export default AdminTeachers;