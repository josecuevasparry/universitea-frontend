import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">Página no encontrada</h2>
        <p className="text-blue-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;