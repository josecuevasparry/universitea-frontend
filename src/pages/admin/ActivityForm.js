import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [formData, setFormData] = useState({
    NOMACTIVIDAD: '',
    FECACTIVIDAD: '',
    SHORTDESCRIPTION: '',
    TIPACTIVIDAD: '',
    DESCRIPCION: '',
    CERTIFICADO: false,
    ENTREGABLE: false,
    archived: false,
    image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch modules for the multiselect
        const modulesRes = await api.get('/api/modulos');
        setModules(modulesRes.data);

        if (id) {
          // Fetch activity data if editing
          const activityRes = await api.get(`/api/actividades/${id}`);
          setFormData(activityRes.data);
          
          // Fetch related modules
          const modactsRes = await api.get(`/api/modact/actividad/${id}`);
          setSelectedModules(modactsRes.data.map(m => m.CODMODULO));
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
      const activityData = {
        ...formData,
        modules: selectedModules
      };
      console.log('Activity Data:', activityData);

      if (id) {
        // Update existing activity
        await api.put(`/api/actividades/${id}`, activityData);
        toast.success('Actividad actualizada');
      } else {
        await api.post('/api/actividades', activityData);
        toast.success('Actividad creada');
      }
      navigate('/admin/actividades');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const toggleModule = (moduleId) => {
    setSelectedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">
          {id ? 'Editar Actividad' : 'Nueva Actividad'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.NOMACTIVIDAD}
                onChange={(e) => setFormData({...formData, NOMACTIVIDAD: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg"
                value={formData.FECACTIVIDAD ? formData.FECACTIVIDAD.split('T')[0] : ''}
                onChange={(e) => setFormData({...formData, FECACTIVIDAD: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Descripción Corta</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.SHORTDESCRIPTION}
                onChange={(e) => setFormData({...formData, SHORTDESCRIPTION: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Tipo</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.TIPACTIVIDAD}
                onChange={(e) => setFormData({...formData, TIPACTIVIDAD: e.target.value})}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Taller">Taller</option>
                <option value="Charla">Charla</option>
                <option value="Curso">Curso</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Descripción Completa</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows="4"
                value={formData.DESCRIPCION}
                onChange={(e) => setFormData({...formData, DESCRIPCION: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.CERTIFICADO}
                  onChange={(e) => setFormData({...formData, CERTIFICADO: e.target.checked})}
                />
                <span>Otorga certificado</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.ENTREGABLE}
                  onChange={(e) => setFormData({...formData, ENTREGABLE: e.target.checked})}
                />
                <span>Requiere entregable</span>
              </label>
            </div>
            
            <div className="md:col-span-2">
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
              <label className="block text-gray-700 mb-2">Módulos Relacionados</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {modules.map(module => (
                  <label key={module.CODMODULO} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(module.CODMODULO)}
                      onChange={() => toggleModule(module.CODMODULO)}
                    />
                    <span>{module.NOMMODULO}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/actividades')}
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

export default ActivityForm;