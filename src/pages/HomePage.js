import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/activities');
      } else {
        navigate('/activities');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-2xl text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">Bienvenido a Universitea</h1>
        <p className="text-lg text-gray-600 mb-8">Plataforma de gestión de actividades educativas</p>
        
        {!user && (
          <div className="space-y-4">
            <Link
              to="/login"
              className="inline-block w-64 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Iniciar sesión
            </Link>
            <p className="text-gray-500">o</p>
            <Link
              to="/signup"
              className="inline-block w-64 px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;