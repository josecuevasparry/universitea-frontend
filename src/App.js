import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './tailwind.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityDetail from './pages/ActivityDetail';
import DocentesPage from './pages/DocentesPage';
import DocenteDetail from './pages/DocenteDetail';
import ModulesPage from './pages/ModulesPage';
import ModuleDetail from './pages/ModuleDetail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPanel from './pages/AdminPanel';
import AdminActivities from './pages/AdminActivities';
import AdminDocentes from './pages/AdminDocentes';
import AdminModules from './pages/AdminModules';

// Context
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Toaster position="top-right" />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/docentes" element={<DocentesPage />} />
              <Route path="/docentes/:id" element={<DocenteDetail />} />
              <Route path="/modules" element={<ModulesPage />} />
              <Route path="/modules/:id" element={<ModuleDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              } />
              <Route path="/admin/activities" element={
                <PrivateRoute>
                  <AdminActivities />
                </PrivateRoute>
              } />
              <Route path="/admin/docentes" element={
                <PrivateRoute>
                  <AdminDocentes />
                </PrivateRoute>
              } />
              <Route path="/admin/modules" element={
                <PrivateRoute>
                  <AdminModules />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;