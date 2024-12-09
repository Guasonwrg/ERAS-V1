import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Header from './Header';
import Footer from './Footer';
import HomePage from './inicio';  
import LoginPage from './ingresar'; 
import UnauthorizedPage from './noAutorizado';
import AdminPage from './adminPage';
import ProtectedRoute from './protectedRoute';
import FormulariosAdmin from './formulariosAdmin';  
import UserPage from './userPage'; 
import Formularios2Comun from './formularios2Comun';
import FormulariosVista from './formulariosVista';
import EscenariosList from './escenariosList';
import PesticidasPage from './seleccionFormulacion';
import TasaDilucion from './seleccionarTasasDilucion';
import ActividadDiaria from './actividadDiaria';
import CalculoRiesgo from './calculoRiesgo';
import Informes from './informes';
import OcupTablas from './Ocup-Tablas';
import InformesList from './informesList';
import EditarOcupacional from './editarOcupacional';
import InformesComun from './informesComun';
import UserList from './userList';
import UserForm from './userForm';
import UserEditForm from './userEditForm';
import UserProfile from './userProfile';
import PestList from './pestList';
import PestAdd from './pestAdd';
import PestView from './pestView';
import PestEdit from './pestEdit';
import ParamForm from './paramForm';
import GoogleCallback from './googleCallback';
import DescargarExcel from './descargarExcel';
import CambiosPendientes from './cambiosPendientes';
import EjecutarScript from './ejecutarScript';
import { ToastContainer } from 'react-toastify';




function App() {
  return (
    <Router>
      <AuthProvider>
        <Header /> 
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ingresar" element={<LoginPage />} />
          <Route path="/noAutorizado" element={<UnauthorizedPage />} />
          <Route path="/adminPage" element={<ProtectedRoute roleRequired="Admin"><AdminPage /></ProtectedRoute>} />
          <Route path="/formularios-admin" element={<ProtectedRoute roleRequired="Admin"><FormulariosAdmin /></ProtectedRoute>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/formularios-comun" element={<ProtectedRoute><Formularios2Comun /></ProtectedRoute>} />
          <Route path="/formularios-vista" element={<ProtectedRoute><FormulariosVista /></ProtectedRoute>} />
          <Route path="/escenarios-list" element={<ProtectedRoute><EscenariosList /></ProtectedRoute>} />
          <Route path="/dilucion" element={<ProtectedRoute><TasaDilucion /></ProtectedRoute>} />
          <Route path="/epp-actividad" element={<ProtectedRoute><ActividadDiaria /></ProtectedRoute>} />
          <Route path="/riesgo" element={<ProtectedRoute><CalculoRiesgo /></ProtectedRoute>} />
          <Route path="/informes" element={<ProtectedRoute><Informes/></ProtectedRoute>} />
          <Route path="/ocup-tablas" element={<ProtectedRoute><OcupTablas/></ProtectedRoute>} />
          <Route path="/informes-ocupacional" element={<ProtectedRoute><InformesList /></ProtectedRoute>} />
          <Route path="/editar-ocupacional/:id" element={<ProtectedRoute><EditarOcupacional /></ProtectedRoute>} />
          <Route path="/informes-comun" element={<ProtectedRoute><InformesComun /></ProtectedRoute>} />
          <Route path="/pesticidas" element={<ProtectedRoute><PesticidasPage /></ProtectedRoute>} />
          <Route path="/usuarios"element={<ProtectedRoute roleRequired="Admin"><UserList /></ProtectedRoute>}/>
          <Route path="/agregar"element={<ProtectedRoute roleRequired="Admin"><UserForm /></ProtectedRoute>}/>
          <Route path="/editar/:id"element={<ProtectedRoute roleRequired="Admin"><UserEditForm /></ProtectedRoute>}/>
          <Route path="/perfil/:id"element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
          <Route path="/pesticidas-abm" element={<ProtectedRoute roleRequired="Admin"><PestList /></ProtectedRoute>}/>
          <Route path="/agregar-pesticida" element={<ProtectedRoute roleRequired="Admin"><PestAdd /></ProtectedRoute>}/>
          <Route path="/editar-pesticida/:PK_Pest" element={<ProtectedRoute roleRequired="Admin"><PestEdit /></ProtectedRoute>}/>
          <Route path="/pesticida/:PK_Pest" element={<ProtectedRoute roleRequired="Admin"><PestView /></ProtectedRoute>}/>
          <Route path="/add-param"element={<ProtectedRoute roleRequired="Admin"><ParamForm /></ProtectedRoute>}/>
          <Route path="/edit-param/:id"element={<ProtectedRoute roleRequired="Admin"><ParamForm /></ProtectedRoute>}/>
          <Route path="/cambios-pendientes"element={<ProtectedRoute roleRequired="Admin"><CambiosPendientes /></ProtectedRoute>}/>
          <Route path="/auth/google/callback" element={<GoogleCallback />} /> 
          <Route path="/descargar" element={<DescargarExcel />} /> 
          <Route path="/ejecutar-script" element={<EjecutarScript />} />

        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;

