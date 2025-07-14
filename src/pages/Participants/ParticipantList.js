import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import participanteService from '../../api/participantes';
import userService from '../../api/users';

const ParticipantList = () => {
  const { actividadId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participantsRes, usersRes] = await Promise.all([
          participanteService.getActivityParticipants(actividadId),
          userService.getAllUsers()
        ]);
        
        setParticipants(participantsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [actividadId]);

  const handleAttendanceChange = async (userId, value) => {
    try {
      await participanteService.updateAttendance(actividadId, userId, value);
      setParticipants(participants.map(p => 
        p.CODUSER === userId ? { ...p, ASISTENCIA: value } : p
      ));
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Participantes</h1>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Certificate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.map((participant) => {
              const user = users.find(u => u.CODUSER === participant.CODUSER);
              return (
                <tr key={participant.CODUSER} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user ? `${user.name} (${user.email})` : participant.CODUSER}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      value={participant.ASISTENCIA}
                      onChange={(e) => handleAttendanceChange(participant.CODUSER, e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {participant.CERTIFICADO || 'Not issued'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantList;