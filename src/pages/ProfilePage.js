import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await api.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        toast.error('Error al cargar perfil');
        console.error('Error fetching profile:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">No se pudo cargar el perfil</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">Mi Perfil</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center text-violet-600 text-2xl font-bold mr-4">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-700">Rol</h3>
                <p className="capitalize">{user.role}</p>
              </div>
              
              {user.mobile && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-violet-700">Teléfono</h3>
                  <p>{user.mobile}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;