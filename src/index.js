import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Pages/LoginAndRegister';
import Vehcile from './Pages/MyVehciles';
import Maintenance from './Pages/MyMaintenanceItem';
import CreateVehcileForm from './Pages/CreateVehcileForm';
import Cookies from 'universal-cookie';
import CreateMaintLog from './Pages/CreateMaintenanceItem';
// import OperationsTest from './Pages/OperationsTest';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
var loggedIn;
const cookies = new Cookies();
var jwt = cookies.get('JWT_Token');
if (jwt){
  loggedIn = true;
}else{
  loggedIn = false;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/CreateMaintenanceLog" element={<CreateMaintLog />} />
        <Route path="/MyVehciles" element={<Vehcile />} />
        <Route path="/CreateVehcile" element={<CreateVehcileForm />} />
        <Route path="/MyMaintenance" element={<Maintenance />} />
        <Route path="/" element={loggedIn ? <Vehcile /> : <Login />}/>
      </Routes>
  </Router>
);
