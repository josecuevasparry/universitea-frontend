import React, { useEffect, useState } from 'react';
import actividadService from '../../api/actividades';
import { useParams } from 'react-router';

const ActivityDetail = () => {
  const [activityData, setActivityData] = useState(null);
  const codactividad = useParams().id;
  
  const fetchActivity = async () => {
    try {
      const response = await actividadService.getActivity(codactividad);
      setActivityData(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Function to preserve line breaks in text
  const formatTextWithLineBreaks = (text) => {
    if (!text) return '';
    return text.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-full mx-auto px-3 py-3 sm:px-6 lg:px-8 andres">
      {activityData && (
        <div className='border-2 border-white rounded-lg p-2 flex flex-col'>
          <div id='tarjeta-actividad' className='px-2 py-2'>
            <div className="space-y-4 pt-0">
              <div id='cabezal' className='lg:flex lg:flex-row lg:text-left'>
                <div id='fecha-y-boton' className='lg:inline-flex flex'>
                  <div className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white 
                    p-2 rounded-lg transition-colors text-md h-fit"
                    onClick={() => alert('inscríbete')}>
                    Inscríbete
                  </div>
                  <div className="text-xl text-white p-2">
                    📅 {formatDate(activityData.FECINICIO)}
                  </div>
                </div>
                <h1 className="lg:text-2xl text-xl font-bold text-white mx-auto texto-sombra">
                  {activityData.NOMACTIVIDAD}
                </h1>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left card with image (50% width) */}
                <div className="lg:w-1/4 ">
                  <div className="bg-white rounded-lg shadow-sm p-6 h-full">
                    <h2 className="text-xl font-semibold text-blue-600">
                      <span> 🎓</span>
                      Actividad
                    </h2>
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {formatTextWithLineBreaks(activityData.BAJADA)}
                    </p>
                    <div className="mt-4">
                      <img 
                        src={`http://localhost:3000/imagenes/${activityData.CODACTIVIDAD}.png`} 
                        alt='actividad'
                        className='rounded-xl w-full object-cover'
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right column with stacked cards (50% width) */}
                <div className="lg:w-fit flex flex-col gap-4" >
                  {/* Description Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
                    <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                      <span>💡 </span>
                      ¿De qué se trata?
                    </h2>
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {formatTextWithLineBreaks(activityData.DESCRIPCION)}
                    </p>
                    
                  </div>
                  
                  {/* Deliverable Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
                    <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                      <span>📚</span>
                      ¿Qué aprenderás?
                    </h2>
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {formatTextWithLineBreaks(activityData.ENTREGABLE)}
                    </p>
                  </div>
                  
                  {/* Certification Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
                    <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                      <span>🏆</span>
                      Te entregaremos un certificado de:
                    </h2>
                    <p className="text-gray-700 mt-2 whitespace-pre-line">
                      {formatTextWithLineBreaks(activityData.CERTIFICADO)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;