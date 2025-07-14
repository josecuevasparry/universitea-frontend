import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ActivityList from './pages/Activities/ActivityList';
import ActivityForm from './pages/Activities/ActivityForm';
import ActivityDetail from './pages/Activities/ActivityDetail';
import ModuleList from './pages/Modules/ModuleList';
import ModuleForm from './pages/Modules/ModuleForm';
// import ModuleEdit from './pages/Modules/ModuleEdit';
import DocenteList from './pages/Docentes/DocenteList';
import DocenteForm from './pages/Docentes/DocenteForm'
import DocenteDetail from './pages/Docentes/DocenteDetail';
import DocenteEdit from './pages/Docentes/DocenteEdit';
import ParticipantList from './pages/Participants/ParticipantList';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import "@fontsource/poiret-one"; // Defaults to weight 400



function App() {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div>
          <h1>An error occurred</h1>
          <p>{error?.message}</p>
          <button onClick={resetError}>Try again</button>
        </div>
      )}
    >
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />}/>

          <Route path="actividades">
            <Route index element={<ActivityList />} />
            <Route path="new" element={<ActivityForm />} />
            <Route path=":id" element={<ActivityDetail />} />
            <Route path=":id/edit" element={<ActivityForm editMode />} />
          </Route>

          <Route path="modulos">
            <Route index element={<ModuleList />} />
            <Route path="new" element={<ModuleForm />} />
            {/* <Route path="/modulos/editar/:id" element={<ModuleEdit />} /> */}
            
          </Route>

          <Route path="docentes">
            <Route index element={<DocenteList />} />
            <Route path='nuevo' element={<DocenteForm />} />
            <Route path=":id" element={<DocenteDetail />} />
            <Route path="/docentes/editar/:id" element={<DocenteEdit />} />
          </Route>

          <Route path="participantes" element={<ParticipantList />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="/modules" element={<ModuleList />} />


        </Route>


      </Routes>

    </ErrorBoundary>
  );
}

export default App;