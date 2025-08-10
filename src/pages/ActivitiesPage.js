import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ActivitiesList from '../components/ActivitiesList';

const ActivitiesPage = () => {
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
      <div className="container mx-auto px-4 py-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Nuestras Actividades</h1>
        </div>
        <ActivitiesList 
          activities={activities} 
          loading={loading}
          showAll={true}
        />
      </div>
    </div>
  );
};

export default ActivitiesPage;