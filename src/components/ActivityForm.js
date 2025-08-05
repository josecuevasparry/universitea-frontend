import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';

const ActivityForm = ({ activity, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load docentes for select options
    const fetchDocentes = async () => {
      try {
        const response = await api.get('/api/docentes');
        setDocentes(response.data);
      } catch (error) {
        console.error('Error fetching docentes:', error);
      }
    };

    fetchDocentes();

    // Reset form with activity data if provided (for editing)
    if (activity) {
      reset({
        CODACTIVIDAD: activity.CODACTIVIDAD,
        NOMACTIVIDAD: activity.NOMACTIVIDAD,
        FECACTIVIDAD: activity.FECACTIVIDAD ? 
          new Date(activity.FECACTIVIDAD).toISOString().slice(0, 16) : '',
        SHORTDESCRIPTION: activity.SHORTDESCRIPTION,
        TIPACTIVIDAD: activity.TIPACTIVIDAD,
        DESCRIPCION: activity.DESCRIPCION,
        CERTIFICADO: activity.CERTIFICADO,
        ENTREGABLE: activity.ENTREGABLE,
        CODDOCENTE: activity.CODDOCENTE
      });
    }
  }, [activity, reset]);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* NOMACTIVIDAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de Actividad</label>
          <input
            type="text"
            {...register('NOMACTIVIDAD', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.NOMACTIVIDAD && (
            <p className="mt-1 text-sm text-red-600">{errors.NOMACTIVIDAD.message}</p>
          )}
        </div>

        {/* FECACTIVIDAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
          <input
            type="datetime-local"
            {...register('FECACTIVIDAD', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.FECACTIVIDAD && (
            <p className="mt-1 text-sm text-red-600">{errors.FECACTIVIDAD.message}</p>
          )}
        </div>

        {/* TIPACTIVIDAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Actividad</label>
          <select
            {...register('TIPACTIVIDAD')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1">Taller</option>
            <option value="2">Seminario</option>
            <option value="3">Conferencia</option>
            <option value="4">Curso</option>
          </select>
        </div>

        {/* CODDOCENTE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Docente Responsable</label>
          <select
            {...register('CODDOCENTE')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Seleccione un docente</option>
            {docentes.map((docente) => (
              <option key={docente.CODDOCENTE} value={docente.CODDOCENTE}>
                {docente.NOMDOCENTE}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SHORTDESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción Corta</label>
        <input
          type="text"
          {...register('SHORTDESCRIPTION', { required: 'Este campo es requerido' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.SHORTDESCRIPTION && (
          <p className="mt-1 text-sm text-red-600">{errors.SHORTDESCRIPTION.message}</p>
        )}
      </div>

      {/* DESCRIPCION */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción Completa</label>
        <textarea
          rows={4}
          {...register('DESCRIPCION')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* CERTIFICADO */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Certificado</label>
        <textarea
          rows={2}
          {...register('CERTIFICADO')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* ENTREGABLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Entregable</label>
        <textarea
          rows={2}
          {...register('ENTREGABLE')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen de la Actividad</label>
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
          {loading ? 'Guardando...' : 'Guardar Actividad'}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;