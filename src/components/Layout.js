import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  CalendarToday as ActivitiesIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  ChevronLeft,
} from '@mui/icons-material';


export default function Layout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const userMenuOpen = Boolean(anchorEl);
  const [openUserMenu, setOpenUserMenu] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(() => {
  //   setOpen(!isMobile);
  // }, [isMobile]);



  if (!auth) {
    return <div>Loading authentication...</div>;
  }
  const { currentUser, logout } = auth;
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleUserMenuClick = (event) => {
    setOpenUserMenu(!openUserMenu)
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    handleUserMenuClose();
  };

  const navItems = [
    { text: 'Inicio', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Docentes', icon: <SchoolIcon />, path: '/docentes' },
    { text: 'Módulos', icon: <SchoolIcon />, path: '/modulos' },
    { text: 'Actividades', icon: <ActivitiesIcon />, path: '/actividades' },
    { text: 'Participantes', icon: <PeopleIcon />, path: '/participantes' },
  ];

  const userMenuItems = [
    { text: 'Perfil', icon: <AccountIcon />, action: () => navigate('/perfil') },
    { text: 'Configuración', icon: <SettingsIcon />, action: () => navigate('/configuracion') },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-semibold">
      {/* Mobile Drawer Backdrop */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleDrawerToggle}
        />
      )}
      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-md transition-all duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'w-64' : 'w-60'}`}
      >
        <div className="flex items-center justify-end p-2 h-16">
          <button
            onClick={handleDrawerToggle}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="text-gray-600" />
          </button>
        </div>
        <div className="border-t border-gray-200"></div>
        <nav className="mt-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.text}>
                <Link
                  to={item.path}
                  className={`flex items-center p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600
                    ${window.location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''}`}
                  onClick={isMobile ? handleDrawerToggle : undefined}
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${open ? 'ml-0 md:ml-60' : 'ml-0'}`}>
        {/* AppBar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 h-24 andres ">
            <div className="flex flex-row items-center ">
              <button
                onClick={handleDrawerToggle}
                className="p-2 mr-2 rounded-full hover:bg-gray-100"
              >
                <MenuIcon className="text-gray-600" />
              </button>
              <p className='text-center text-gray-100 lg:text-2xl text-xl'>Formación Práctica en Autismo y Neurodivergencia</p>
              <img src='http://localhost:3000/logouniversitea4.png' alt='headerimg' className='h-24 mx-auto'/>
            </div>

            {currentUser && (
              <div className="flex items-center">
                {!isMobile && (
                  <span className="mr-3 text-sm text-gray-200">{currentUser.name}</span>
                )}
                <button
                  onClick={handleUserMenuClick}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </header>

        {/* User Menu */}
        {userMenuOpen && openUserMenu && (
          <div className="fixed right-4 top-16 z-40 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {userMenuItems.map((item) => (
                <button
                  key={item.text}
                  onClick={() => {
                    item.action();
                    handleUserMenuClose();

                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  {item.text}
                </button>
              ))}
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-3 text-gray-500"><LogoutIcon fontSize="small" /></span>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-0 md:p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}