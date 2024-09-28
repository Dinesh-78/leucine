import { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



import StudentDashboard from "./StudentDashboard.jsx";
import FacultyDashboard from './FacultyDashboard.jsx';
import Login from './Login.jsx';
import AdminDashboard from './AdminDashboard.jsx';

function App() {
  return (
      <>
          {/* This is the alias of BrowserRouter i.e. Router */}
          <Router>
              <Routes>
                 
                  <Route
                      exact
                      path="/"
                      element={<Login />}
                  />

              
                  <Route
                      path="/faculty"
                      element={<FacultyDashboard />}
                  />

     
                  <Route
                      path="/student"
                      element={<StudentDashboard />}
                  />

                  <Route
                      path="/admin"
                      element={<AdminDashboard />}
                  />

              
                  <Route
                      path="*"
                      element={<Navigate to="/" />}
                  />
              </Routes>
          </Router>
      </>
  );
}

export default App;