import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        {user && (
          <p className="text-gray-600 mt-2">
            Bienvenido, <span className="font-medium">{user.nombre}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Activities Card */}
        <Link 
          to="/admin/activities" 
          className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-blue-200"
          aria-label="Gestionar actividades"
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              Actividades
            </h2>
          </div>
          <p className="text-gray-600">Gestionar todas las actividades académicas</p>
          <div className="mt-4 text-blue-500 font-medium flex items-center">
            Administrar
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Teachers Card */}
        <Link 
          to="/admin/docentes" 
          className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-green-200"
          aria-label="Gestionar docentes"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
              Docentes
            </h2>
          </div>
          <p className="text-gray-600">Administrar el personal docente</p>
          <div className="mt-4 text-green-500 font-medium flex items-center">
            Administrar
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Modules Card */}
        <Link 
          to="/admin/modules" 
          className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-purple-200"
          aria-label="Gestionar módulos"
        >
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 transition-colors">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
              Módulos
            </h2>
          </div>
          <p className="text-gray-600">Gestionar módulos del plan de estudios</p>
          <div className="mt-4 text-purple-500 font-medium flex items-center">
            Administrar
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;