import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Button, 
  Box,
  Divider 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ActivityCard = ({ actividad, showModule = false, showActions = false }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" component="div">
            {actividad.nombre || 'Actividad'}
          </Typography>
          <Chip 
            label={format(new Date(actividad.FECACTIVIDAD), 'PPP', { locale: es })} 
            size="small" 
          />
        </Box>

        {showModule && actividad.modulo && (
          <Chip 
            label={actividad.modulo.titulo} 
            color="primary" 
            size="small" 
            sx={{ mb: 1 }}
          />
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {actividad.descripcion || 'Sin descripción disponible'}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">
            {format(new Date(actividad.FECACTIVIDAD), 'HH:mm', { locale: es })}
          </Typography>
          
          {showActions && (
            <Button 
              component={Link}
              to={`/actividades/${actividad.CODACTIVIDAD}`}
              size="small"
            >
              Ver detalles
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;