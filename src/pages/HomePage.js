// pages/HomePage.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ActivitiesList from '../components/ActivitiesList';

const HomePage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/api/actividades/');
        setActivities(response.data);
      } catch (error) {
        toast.error('Error al cargar actividades');
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container  mx-auto px-4 font-semibold py-8 rounded-md shadow-md">
        <ActivitiesList 
          activities={activities} 
          loading={loading}
          title="Próximamente en Universitea"
          description="Explora nuestras actividades de aprendizaje"
        />
        {/* Login/Register Section */}
        <div className="hidden mt-12 bg-blue-100 rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿Estás inscrito?</h2>
          <div className="space-y-4">
            <Link
              to="/login"
              className="inline-block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Iniciar sesión
            </Link>
            <p className="text-blue-500">o</p>
            <Link
              to="/signup"
              className="inline-block w-full px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;