import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './Pages/admin/Admin';
import ViewFormPage from './Pages/admin/ViewForm';
import AddUserPage from './Pages/admin/AddUser';
import HomePage from './Pages/Home';
import DetailsPage from './Pages/details';
import LoginPage from './Pages/login.jsx';
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

function App() {
  return (
    <Router>
      <div className='Main'>
        <div className='Container'>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<RequireAuth allowedRole="basic" />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/details' element={<DetailsPage />} />
              <Route path='/insurance' element={<InsurancePage />} />
            </Route>
            <Route element={<RequireAuth allowedRole="admin" />}>
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/addUser' element={<AddUserPage />} />
              <Route path='/form/:name' element={<ViewFormPage />} />
              <Route path='/formBuild' element={<FormBuildingPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
