import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-blue-100 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/admin/actividades" 
            className="bg-blue-100 p-6 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Actividades</h2>
            <p className="text-blue-600">Administrar todas las actividades</p>
          </Link>
          
          <Link 
            to="/admin/docentes" 
            className="bg-green-100 p-6 rounded-lg hover:bg-green-200 transition-colors"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">Docentes</h2>
            <p className="text-green-600">Administrar docentes</p>
          </Link>
          
          <Link 
            to="/admin/modulos" 
            className="bg-blue-100 p-6 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Módulos</h2>
            <p className="text-blue-600">Administrar módulos</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;