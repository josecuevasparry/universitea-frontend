import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Typography, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import actividadService from '../../api/actividades';
import docenteService from '../../api/docentes';
import moduloService from '../../api/modulos';

const ActivityForm = ({ editMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [docentes, setDocentes] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docentesRes, modulesRes] = await Promise.all([
          docenteService.getAllDocentes(),
          moduloService.getModules()
        ]);
        console.log(docentesRes,modulesRes)
        // Ensure we're working with arrays
        setDocentes(docentesRes.data?.data || docentesRes.data || []);
        setModules(modulesRes || modulesRes || []);
        
        if (editMode && id) {
          const activityRes = await actividadService.getActivity(id);
          formik.setValues(activityRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);
  const formik = useFormik({
    initialValues: {
      FECACTIVIDAD: '',
      CODDOCENTE: '',
      CODMODULO: ''
    },
    validationSchema: Yup.object({
      FECACTIVIDAD: Yup.date().required('Required'),
      CODDOCENTE: Yup.number().required('Required'),
      CODMODULO: Yup.number().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        if (editMode) {
          await actividadService.updateActivity(id, values);
        } else {
          await actividadService.createActivity(values);
        }
        navigate('/actividades');
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    }
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {editMode ? 'Editar Actividad' : 'Crear Actividad'}
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="FECACTIVIDAD"
              name="FECACTIVIDAD"
              label="Activity Date"
              type="datetime-local"
              value={formik.values.FECACTIVIDAD}
              onChange={formik.handleChange}
              error={formik.touched.FECACTIVIDAD && Boolean(formik.errors.FECACTIVIDAD)}
              helperText={formik.touched.FECACTIVIDAD && formik.errors.FECACTIVIDAD}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              id="CODDOCENTE"
              name="CODDOCENTE"
              label="Docente"
              value={formik.values.CODDOCENTE}
              onChange={formik.handleChange}
              error={formik.touched.CODDOCENTE && Boolean(formik.errors.CODDOCENTE)}
              helperText={formik.touched.CODDOCENTE && formik.errors.CODDOCENTE}
            >
              {Array.isArray(docentes) && docentes.map((docente) => (
                <MenuItem key={docente.CODDOCENTE} value={docente.CODDOCENTE}>
                  {docente.NOMDOCENTE}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item md={12}>
            <TextField
              select
              fullWidth
              id="CODMODULO"
              name="CODMODULO"
              label="Module"
              value={formik.values.CODMODULO}
              onChange={formik.handleChange}
              error={formik.touched.CODMODULO && Boolean(formik.errors.CODMODULO)}
              helperText={formik.touched.CODMODULO && formik.errors.CODMODULO}
            >
              {Array.isArray(modules) && modules.map((module) => (
                <MenuItem key={module.CODMODULO} value={module.CODMODULO}>
                  {module.titulo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ActivityForm;