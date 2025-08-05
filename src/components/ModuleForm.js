import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const ModuleForm = ({ module, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [docentes, setDocentes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const loading = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docentesRes, actividadesRes] = await Promise.all([
          api.get('/api/docentes'),
          api.get('/api/actividades')
        ]);
        setDocentes(docentesRes.data);
        setActividades(actividadesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (module) {
      reset({
        NOMMODULO: module.NOMMODULO,
        CONTENIDOS: module.CONTENIDOS,
        CODDOCENTE: module.CODDOCENTE,
        CODACTIVIDAD: module.CODACTIVIDAD
      });
    }
  }, [module, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NOMMODULO */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Módulo</label>
          <input
            type="text"
            {...register('NOMMODULO', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.NOMMODULO && (
            <p className="mt-1 text-sm text-red-600">{errors.NOMMODULO.message}</p>
          )}
        </div>

        {/* CODDOCENTE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Docente</label>
          <select
            {...register('CODDOCENTE')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccione un docente</option>
            {docentes.map(docente => (
              <option key={docente.CODDOCENTE} value={docente.CODDOCENTE}>
                {docente.NOMDOCENTE}
              </option>
            ))}
          </select>
        </div>

        {/* CODACTIVIDAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Actividad</label>
          <select
            {...register('CODACTIVIDAD')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccione una actividad</option>
            {actividades.map(actividad => (
              <option key={actividad.CODACTIVIDAD} value={actividad.CODACTIVIDAD}>
                {actividad.NOMACTIVIDAD}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CONTENIDOS */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenidos</label>
        <textarea
          rows={8}
          {...register('CONTENIDOS', { required: 'Este campo es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.CONTENIDOS && (
          <p className="mt-1 text-sm text-red-600">{errors.CONTENIDOS.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen del Módulo</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : (module ? 'Actualizar Módulo' : 'Guardar Módulo')}
        </button>
      </div>
    </form>
  );
};

export default ModuleForm;