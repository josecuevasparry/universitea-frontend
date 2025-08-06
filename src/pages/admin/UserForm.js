import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: 'user',
    cuidador: false,
    profesional: false,
    archived: false
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/api/usuarios/${id}`);
          // Don't load password
          const { password, ...userData } = response.data;
          setFormData(userData);
        } catch (error) {
          toast.error('Error al cargar usuario');
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id) {
        await api.put(`/api/usuarios/${id}`, formData);
        toast.success('Usuario actualizado');
      } else {
        await api.post('/api/usuarios', formData);
        toast.success('Usuario creado');
      }
      navigate('/admin/usuarios');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">
          {id ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required={!id}
              />
              {id && <p className="text-sm text-gray-500 mt-1">Dejar en blanco para mantener la contraseña actual</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-lg"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Rol</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.cuidador}
                  onChange={(e) => setFormData({...formData, cuidador: e.target.checked})}
                />
                <span>Cuidador</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.profesional}
                  onChange={(e) => setFormData({...formData, profesional: e.target.checked})}
                />
                <span>Profesional</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/usuarios')}
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

export default UserForm;