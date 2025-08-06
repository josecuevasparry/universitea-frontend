import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // or './App.css'
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminActivities from "./pages/admin/AdminActivities";
import ActivityForm from "./pages/admin/ActivityForm";
import AdminModules from "./pages/admin/AdminModules";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminUsers from "./pages/admin/AdminUsers";
import ModuleForm from "./pages/admin/ModuleForm";
import TeacherForm from "./pages/admin/TeacherForm";
import UserForm from "./pages/admin/UserForm";
import HomePage from "./pages/HomePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import ModulesPage from "./pages/ModulosPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import TeachersPage from "./pages/DocentesPage";
import TeacherDetailPage from "./pages/TeacherDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
// import AdminPanelPage from "./pages/AdminPanelPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/actividades" element={<ActivitiesPage />} />
            <Route path="/actividades/:id" element={<ActivityDetailPage />} />
            <Route path="/modulos" element={<ModulesPage />} />
            <Route path="/modulos/:id" element={<ModuleDetailPage />} />
            <Route path="/docentes" element={<TeachersPage />} />
            <Route path="/docentes/:id" element={<TeacherDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/actividades"
              element={
                <AdminRoute>
                  <AdminActivities />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/actividades/nueva"
              element={
                <AdminRoute>
                  <ActivityForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/actividades/editar/:id"
              element={
                <AdminRoute>
                  <ActivityForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/modulos"
              element={
                <AdminRoute>
                  <AdminModules />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/modulos/nuevo"
              element={
                <AdminRoute>
                  <ModuleForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/modulos/editar/:id"
              element={
                <AdminRoute>
                  <ModuleForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/docentes"
              element={
                <AdminRoute>
                  <AdminTeachers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/docentes/nuevo"
              element={
                <AdminRoute>
                  <TeacherForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/docentes/editar/:id"
              element={
                <AdminRoute>
                  <TeacherForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/usuarios/nuevo"
              element={
                <AdminRoute>
                  <UserForm />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/usuarios/editar/:id"
              element={
                <AdminRoute>
                  <UserForm />
                </AdminRoute>
              }
            />

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;