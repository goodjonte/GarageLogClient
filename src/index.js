import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Pages/LoginAndRegister';
import Vehcile from './Pages/MyVehciles';
import Maintenance from './Pages/MyMaintenanceItem';
import Cookies from 'universal-cookie';
// import OperationsTest from './Pages/OperationsTest';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const cookies = new Cookies();
var jwt = cookies.get('JWT_Token');
if (jwt){
    var loggedIn = true;
}else{
  var loggedIn = false;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/MyVehciles" element={<Vehcile />} />
        <Route path="/MyMaintenance" element={<Maintenance />} />
        <Route path="/" element={loggedIn ? <Vehcile /> : <Login />}/>
      </Routes>
  </Router>
);
