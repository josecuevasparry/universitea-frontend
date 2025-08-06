import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  return (
    <nav className="bg-purple-400 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Universitea
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/actividades" className="hover:text-violet-200 transition-colors">
              Actividades
            </Link>
            <Link to="/modulos" className="hover:text-violet-200 transition-colors">
              Módulos
            </Link>
            <Link to="/docentes" className="hover:text-violet-200 transition-colors">
              Docentes
            </Link>
            
            {user?.role === 'admin' && (
              <div className="relative">
                <button 
                  onClick={toggleAdminMenu}
                  className="hover:text-violet-200 transition-colors flex items-center focus:outline-none"
                  aria-expanded={adminMenuOpen}
                  aria-haspopup="true"
                >
                  Admin
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform ${adminMenuOpen ? 'transform rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
                
                {adminMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                  >
                    <div className="py-1" role="none">
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-purple-900 hover:bg-purple-100"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/actividades" 
                        className="block px-4 py-2 text-sm text-purple-900 hover:bg-purple-100"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        Gestionar Actividades
                      </Link>
                      <Link 
                        to="/admin/modulos" 
                        className="block px-4 py-2 text-sm text-purple-900 hover:bg-purple-100"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        Gestionar Módulos
                      </Link>
                      <Link 
                        to="/admin/docentes" 
                        className="block px-4 py-2 text-sm text-purple-900 hover:bg-purple-100"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        Gestionar Docentes
                      </Link>
                      <Link 
                        to="/admin/usuarios" 
                        className="block px-4 py-2 text-sm text-purple-900 hover:bg-purple-100"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                      >
                        Gestionar Usuarios
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/perfil" className="hover:text-violet-200 transition-colors">
                  Mi Perfil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-violet-200 transition-colors">
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/registro" 
                  className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;