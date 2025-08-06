import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-800 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminCard 
            title="Actividades" 
            description="Gestionar actividades educativas"
            link="/admin/actividades"
            icon="📅"
          />
          <AdminCard 
            title="Módulos" 
            description="Gestionar módulos de aprendizaje"
            link="/admin/modulos"
            icon="📚"
          />
          <AdminCard 
            title="Docentes" 
            description="Gestionar profesores"
            link="/admin/docentes"
            icon="👨‍🏫"
          />
          <AdminCard 
            title="Usuarios" 
            description="Gestionar usuarios del sistema"
            link="/admin/usuarios"
            icon="👥"
          />
        </div>
      </div>
    </div>
  );
};

const AdminCard = ({ title, description, link, icon }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h2 className="text-xl font-bold text-violet-700 mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default AdminDashboard;