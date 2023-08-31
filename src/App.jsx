import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './Pages/admin/Admin';
import ViewFormPage from './Pages/admin/ViewForm';
import AddUserPage from './Pages/admin/AddUser';
import HomePage from './Pages/Home';
import PolicyDetails from './Pages/admin/PolicyDetails'
import DetailsPage from './Pages/details';
import LoginPage from './Pages/login.jsx';
import Confirmation from './Pages/Confirmation';
import RequireAuth from './components/RequireAuth';
import FormBuildingPage from './Pages/admin/FormBuilding';
import "formiojs/dist/formio.full.css";
import "formiojs/dist/formio.builder.css";
import "formiojs/dist/formio.builder.min.css";
import "formiojs/dist/formio.embed.css";
import "formiojs/dist/formio.embed.min.css";
import "formiojs/dist/formio.form.css";
import './App.css'
import InsurancePage from './Pages/Insurance';
import UserPolicyDetailsPage from './Pages/PolicyDetails';

function App() {
  return (
    <Router>
      <div className='Main'>
        
        <div className='Container'>
        <img src="src/assets/CCS_Logo.png" alt="afssaf"  width="100" />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<RequireAuth allowedRole="basic" />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/details' element={<DetailsPage />} />
              <Route path='/Policy' element={<UserPolicyDetailsPage />} />
              <Route path='/insurance' element={<InsurancePage />} />
              <Route path='/Confirmationpage' element={<Confirmation />} />
            </Route>
            <Route element={<RequireAuth allowedRole="admin" />}>
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/addUser' element={<AddUserPage />} />
              <Route path='/form/:name' element={<ViewFormPage />} />
              <Route path='/formBuild' element={<FormBuildingPage />} />
              <Route path='/PolicyDetails' element={<PolicyDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
