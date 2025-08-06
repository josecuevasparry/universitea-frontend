import React from 'react';
import { useForm } from 'react-hook-form';

const DocenteForm = ({ docente, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  React.useEffect(() => {
    if (docente) {
      reset({
        NOMDOCENTE: docente.NOMDOCENTE,
        CVDOCENTE: docente.CVDOCENTE,
        EMAIL: docente.EMAIL,
        ESPECIALIDAD: docente.ESPECIALIDAD,
        TELEFONO: docente.TELEFONO,
        RUTDOCENTE: docente.RUTDOCENTE
      });
    }
  }, [docente, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NOMDOCENTE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            {...register('NOMDOCENTE', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.NOMDOCENTE && (
            <p className="mt-1 text-sm text-red-600">{errors.NOMDOCENTE.message}</p>
          )}
        </div>

        {/* ESPECIALIDAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Especialidad</label>
          <input
            type="text"
            {...register('ESPECIALIDAD', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.ESPECIALIDAD && (
            <p className="mt-1 text-sm text-red-600">{errors.ESPECIALIDAD.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('EMAIL', { 
              required: 'Este campo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.EMAIL && (
            <p className="mt-1 text-sm text-red-600">{errors.EMAIL.message}</p>
          )}
        </div>

        {/* TELEFONO */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            {...register('TELEFONO', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.TELEFONO && (
            <p className="mt-1 text-sm text-red-600">{errors.TELEFONO.message}</p>
          )}
        </div>

        {/* RUTDOCENTE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            {...register('RUTDOCENTE', { required: 'Este campo es requerido' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="12345678-9"
          />
          {errors.RUTDOCENTE && (
            <p className="mt-1 text-sm text-red-600">{errors.RUTDOCENTE.message}</p>
          )}
        </div>
      </div>

      {/* CVDOCENTE */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Curriculum</label>
        <textarea
          rows={6}
          {...register('CVDOCENTE')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Foto del Docente</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-blue-700 hover:file:bg-purple-100"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-purple-100 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {docente ? 'Actualizar Docente' : 'Guardar Docente'}
        </button>
      </div>
    </form>
  );
};

export default DocenteForm;