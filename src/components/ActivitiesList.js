import { Link } from 'react-router-dom';

const ActivitiesList = ({ activities, loading, title = "Próximas Actividades", description = "", showAll = false }) => {
  if (loading) return <div className="text-center py-8">Cargando actividades...</div>;
  if (!activities || activities.length === 0) return <div className="text-center py-8">No hay actividades disponibles</div>;

  const displayedActivities = showAll ? activities : activities.slice(0, 3);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-violet-800">{title}</h2>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedActivities.map((activity) => (
          <div key={activity.CODACTIVIDAD} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {activity.image && (
              <img 
                src={`/uploads/${activity.image}`} 
                alt={activity.NOMACTIVIDAD} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-violet-700 mb-2">{activity.NOMACTIVIDAD}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {new Date(activity.FECACTIVIDAD).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">{activity.SHORTDESCRIPTION}</p>
              <Link
                to={`/actividades/${activity.CODACTIVIDAD}`}
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {!showAll && activities.length > 3 && (
        <div className="mt-8 text-center">
          <Link
            to="/actividades"
            className="inline-block px-6 py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Ver todas las actividades
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;