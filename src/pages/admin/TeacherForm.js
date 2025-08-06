import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const TeacherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    NOMDOCENTE: '',
    CVDOCENTE: '',
    EMAIL: '',
    ESPECIALIDAD: '',
    TELEFONO: '',
    RUTDOCENTE: '',
    archived: false,
    image: null
  });

  useEffect(() => {
    if (id) {
      const fetchTeacher = async () => {
        try {
          const response = await api.get(`/api/docentes/${id}`);
          setFormData(response.data);
        } catch (error) {
          toast.error('Error al cargar docente');
        }
      };
      fetchTeacher();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id) {
        await api.put(`/api/docentes/${id}`, formData);
        toast.success('Docente actualizado');
      } else {
        await api.post('/api/docentes', formData);
        toast.success('Docente creado');
      }
      navigate('/admin/docentes');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">
          {id ? 'Editar Docente' : 'Nuevo Docente'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.NOMDOCENTE}
                onChange={(e) => setFormData({...formData, NOMDOCENTE: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">RUT</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.RUTDOCENTE}
                onChange={(e) => setFormData({...formData, RUTDOCENTE: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={formData.EMAIL}
                onChange={(e) => setFormData({...formData, EMAIL: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-lg"
                value={formData.TELEFONO}
                onChange={(e) => setFormData({...formData, TELEFONO: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Especialidad</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.ESPECIALIDAD}
                onChange={(e) => setFormData({...formData, ESPECIALIDAD: e.target.value})}
                required
              />
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
              <label className="block text-gray-700 mb-2">Curriculum</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows="4"
                value={formData.CVDOCENTE}
                onChange={(e) => setFormData({...formData, CVDOCENTE: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/docentes')}
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

export default TeacherForm;