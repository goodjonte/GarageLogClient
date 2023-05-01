import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserLogin from './Pages/LoginAndRegister';
import Vehcile from './Pages/MyVehcile';
import Maintenance from './Pages/MyMaintenance';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="MyVehcile" element={<Vehcile />} />
        <Route path="MyMaintenance" element={<Maintenance />} />
      </Routes>
  </Router>
);
