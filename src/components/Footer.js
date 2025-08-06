const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Universitea</h3>
            <p className="text-violet-200">
              Plataforma educativa para el aprendizaje continuo.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/actividades" className="text-violet-200 hover:text-white">Actividades</a></li>
              <li><a href="/modulos" className="text-violet-200 hover:text-white">Módulos</a></li>
              <li><a href="/docentes" className="text-violet-200 hover:text-white">Docentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-violet-200">centrocaminantes@caminantes.cl</p>
            <p className="text-violet-200">+56 9 7511 4334</p>
          </div>
        </div>
        
        <div className="border-t border-violet-700 mt-8 pt-6 text-center text-violet-300">
          <p>&copy; {new Date().getFullYear()} Universitea. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;