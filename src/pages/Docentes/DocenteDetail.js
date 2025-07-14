import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  AcademicCapIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/outline';
import docenteService from '../../api/docentes';
import actividadService from '../../api/actividades';
import { useAuth } from '../../contexts/AuthContext';
import ActivityCard from '../Activities/ActivityCard';

const DocenteDetail = () => {
  const { id } = useParams();
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actividades, setActividades] = useState([]);
  const auth  = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [docenteRes, actividadesRes] = await Promise.all([
          docenteService.getDocenteById(id),
          actividadService.getActivitiesByDocente(id)
        ]);
        setDocente(docenteRes);
        setActividades(actividadesRes);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del docente');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
        <Link 
          to="/docentes" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!docente) {
    return (
      <div className="p-6">
        <p className="mb-4">Docente no encontrado</p>
        <Link 
          to="/docentes" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link 
          to="/docentes" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Volver al listado
        </Link>
        
        {auth?.currentUser?.role === 'admin' && (
          <div className="flex space-x-3">
            <Link
              to="/docentes/nuevo"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nuevo Docente
            </Link>
            <Link
              to={`/docentes/editar/${id}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Editar
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-600">
              {docente.NOMDOCENTE.charAt(0)}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{docente.NOMDOCENTE}</h1>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">RUT</p>
                      <p className="text-sm text-gray-900">{docente.RUTDOCENTE}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MailIcon className="h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contacto</p>
                      <p className="text-sm text-gray-900">{docente.contacto || 'No especificado'}</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="text-sm text-gray-900">{docente.telefono || 'No especificado'}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Especialidad</p>
                      <p className="text-sm text-gray-900">{docente.especialidad || 'No especificada'}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Curriculum</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <p className="whitespace-pre-wrap">{docente.CVDOCENTE}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Actividades Asignadas
          </h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {actividades.length} actividades
          </span>
        </div>
        {actividades.length === 0 ? (
          <p className="text-gray-600">No hay actividades asignadas</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividades && actividades.map((actividad) => (
              <ActivityCard 
                key={actividad.CODACTIVIDAD}
                actividad={actividad} 
                showModule 
                showActions={auth?.currentUser?.role === 'admin'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocenteDetail;