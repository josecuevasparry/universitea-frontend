// components/ActivityCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ActivityCard = ({ activity }) => {
  const getImageUrl = () => {
    if (activity.image) return activity.image;
    return `http://localhost:3000/imagenes/${activity.CODACTIVIDAD}.jpg`;
  };

  return (
    <div className="bg-purple-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <img 
          src={getImageUrl()} 
          alt={activity.NOMACTIVIDAD} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "http://localhost:3000/imagenes/actividades/"+activity.CODACTIVIDAD+".jpg"
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {activity.NOMACTIVIDAD}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {activity.SHORTDESCRIPTION}
        </p>
        <div className="flex items-center text-gray-500 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {format(new Date(activity.FECACTIVIDAD), 'PPP', { locale: es })}
          </span>
        </div>
        <Link 
          to={`/actividades/${activity.CODACTIVIDAD}`}
          className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;