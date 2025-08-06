const ActivityTable = ({ activities, onView, onEdit, onArchive }) => {
  const getActivityType = (type) => {
    switch (type) {
      case '1': return 'Taller';
      case '2': return 'Seminario';
      default: return 'Conferencia';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity) => (
            <tr key={activity.CODACTIVIDAD}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{activity.NOMACTIVIDAD}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(activity.FECACTIVIDAD).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {getActivityType(activity.TIPACTIVIDAD)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onView(activity.CODACTIVIDAD)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(activity.CODACTIVIDAD)}
                  className="text-green-600 hover:text-green-900 mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => onArchive(activity.CODACTIVIDAD)}
                  className="text-red-600 hover:text-red-900"
                >
                  Archivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;