import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminPanelPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        // Verify user is admin
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.role !== 'admin') {
          toast.error('No tienes permisos para acceder a esta página');
          navigate('/');
          return;
        }
        
        // Fetch stats (you would need to create these endpoints in your backend)
        const [activitiesRes, modulesRes, teachersRes] = await Promise.all([
          api.get('/api/actividades/'),
          api.get('/api/modulos/'),
          api.get('/api/docentes/')
        ]);
        
        setStats({
          activities: activitiesRes.data.length,
          modules: modulesRes.data.length,
          teachers: teachersRes.data.length
        });
      } catch (error) {
        toast.error('Error al cargar el panel de administración');
        console.error('Error fetching admin panel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Panel de Administración</h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Actividades</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.activities}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Módulos</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.modules}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Docentes</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.teachers}</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <a 
                href="/admin/actividades/nueva" 
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Nueva Actividad
              </a>
              <a 
                href="/admin/modulos/nuevo" 
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Nuevo Módulo
              </a>
              <a 
                href="/admin/docentes/nuevo" 
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Nuevo Docente
              </a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Enlaces de Administración</h3>
            <div className="space-y-3">
              <a 
                href="/admin/actividades" 
                className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
              >
                Gestionar Actividades
              </a>
              <a 
                href="/admin/modulos" 
                className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
              >
                Gestionar Módulos
              </a>
              <a 
                href="/admin/docentes" 
                className="block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
              >
                Gestionar Docentes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;