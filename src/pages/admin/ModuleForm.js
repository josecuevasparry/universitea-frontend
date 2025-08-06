import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const ModuleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [formData, setFormData] = useState({
    NOMMODULO: '',
    CONTENIDOS: '',
    CODDOCENTE: '',
    archived: false,
    image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, activitiesRes] = await Promise.all([
          api.get('/api/docentes'),
          api.get('/api/actividades')
        ]);
        setTeachers(teachersRes.data);
        setActivities(activitiesRes.data);

        if (id) {
          const moduleRes = await api.get(`/api/modulos/${id}`);
          setFormData(moduleRes.data);
          
          const modactsRes = await api.get(`/api/modact/modulo/${id}`);
          setSelectedActivities(modactsRes.data.map(m => m.CODACTIVIDAD));
        }
      } catch (error) {
        toast.error('Error al cargar datos');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const moduleData = {
        ...formData,
        activities: selectedActivities
      };

      if (id) {
        await api.put(`/api/modulos/${id}`, moduleData);
        toast.success('Módulo actualizado');
      } else {
        await api.post('/api/modulos', moduleData);
        toast.success('Módulo creado');
      }
      navigate('/admin/modulos');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const toggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">
          {id ? 'Editar Módulo' : 'Nuevo Módulo'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.NOMMODULO}
                onChange={(e) => setFormData({...formData, NOMMODULO: e.target.value})}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Contenidos</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows="6"
                value={formData.CONTENIDOS}
                onChange={(e) => setFormData({...formData, CONTENIDOS: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Docente</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.CODDOCENTE}
                onChange={(e) => setFormData({...formData, CODDOCENTE: e.target.value})}
              >
                <option value="">Seleccionar docente</option>
                {teachers.map(teacher => (
                  <option key={teacher.CODDOCENTE} value={teacher.CODDOCENTE}>
                    {teacher.NOMDOCENTE}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.image && typeof formData.image === 'string' && (
                <img 
                  src={`/uploads/${formData.image}`} 
                  alt="Preview" 
                  className="mt-2 h-32 object-cover"
                />
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Actividades Relacionadas</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {activities.map(activity => (
                  <label key={activity.CODACTIVIDAD} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity.CODACTIVIDAD)}
                      onChange={() => toggleActivity(activity.CODACTIVIDAD)}
                    />
                    <span>{activity.NOMACTIVIDAD}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/modulos')}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleForm;