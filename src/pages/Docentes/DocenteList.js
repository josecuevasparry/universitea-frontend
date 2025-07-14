import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  EyeIcon
} from '@heroicons/react/outline';
import docenteService from '../../api/docentes';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmationDialog from '../common/ConfirmationDialog';

const DocenteList = () => {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const auth = useAuth();

  const fetchDocentes = async () => {
    try {
      setLoading(true);
      const response = await docenteService.getAllDocentes(page, 10, searchTerm);
      setDocentes(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching docentes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await docenteService.deleteDocente(selectedId);
      fetchDocentes();
    } catch (error) {
      console.error('Error deleting docente:', error);
    }
    setOpenDialog(false);
  };

  return (
    <div className="andres p-4 md:p-6 max-w-6xl mx-auto font-semibold text-xl">
      <div className=" marker:flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className='flex flex-row justify-center'>
          <div className="text-2xl font-bold text-gray-100 p-2 mt-3 my-auto align-middle text-center"></div>
          <img src='./logouniversitea4.png' alt='universitea' className='w-1/2 my-auto'></img>
        </div>

        {auth?.currentUser?.role === 'admin' && (
          <Link
            to="/docentes/nuevo"
            className="inline-flex items-center pt-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto justify-center"
          >
            <PlusIcon className="h-5 w-5 mr-2 " />
            Nuevo Docente
          </Link>
        )}
      </div>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por nombre o RUT"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : docentes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No se encontraron docentes</p>
        </div>
      ) : (
        <>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    RUT
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    CV Resumen
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {docentes.map((docente) => (
                  <tr key={docente.CODDOCENTE}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{docente.NOMDOCENTE}</div>
                      <div className="text-xs text-gray-500 sm:hidden">{docente.RUTDOCENTE}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-500">{docente.RUTDOCENTE}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="text-sm text-gray-500">
                        {docente.CVDOCENTE.length > 50
                          ? `${docente.CVDOCENTE.substring(0, 50)}...`
                          : docente.CVDOCENTE}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold">
                      <div className="flex space-x-2">
                        <Link
                          to={`/docentes/${docente.CODDOCENTE}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalle"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        {auth?.currentUser?.role === 'admin' && (
                          <>
                            <Link
                              to={`/docentes/editar/${docente.CODDOCENTE}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Editar"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(docente.CODDOCENTE)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        content="¿Está seguro que desea eliminar este docente?"
      />
    </div>
  );
};

export default DocenteList;