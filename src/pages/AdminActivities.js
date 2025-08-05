import { useState } from 'react';
import ActivityForm from '../components/ActivityForm';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      let response;
      if (currentActivity) {
        // Update existing activity
        response = await api.put(`/api/actividades/${currentActivity.CODACTIVIDAD}`, formData);
        setActivities(activities.map(a => 
          a.CODACTIVIDAD === currentActivity.CODACTIVIDAD ? response.data : a
        ));
        toast.success('Actividad actualizada correctamente');
      } else {
        // Create new activity
        response = await api.post('/api/actividades', formData);
        setActivities([...activities, response.data]);
        toast.success('Actividad creada correctamente');
      }
      
      setShowForm(false);
      setCurrentActivity(null);
    } catch (error) {
      toast.error('Error al guardar la actividad');
      console.error('Error saving activity:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Administrar Actividades</h1>
      
      <button
        onClick={() => {
          setCurrentActivity(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Nueva Actividad
      </button>
      
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentActivity ? 'Editar Actividad' : 'Crear Nueva Actividad'}
          </h2>
          <ActivityForm 
            activity={currentActivity}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setCurrentActivity(null);
            }}
          />
        </div>
      )}
      
      {/* Activity list would go here */}
    </div>
  );
};

export default AdminActivities;