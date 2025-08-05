import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Universitea</Link>
        <div className="space-x-4">
          <Link to="/activities" className="hover:underline">Actividades</Link>
          <Link to="/docentes" className="hover:underline">Docentes</Link>
          <Link to="/modules" className="hover:underline">Módulos</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;