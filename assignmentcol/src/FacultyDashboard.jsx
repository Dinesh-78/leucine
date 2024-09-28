import React from 'react';
import ManageClassList from './FacultyMenu/ManageClass';
import UpdateProfile from './FacultyMenu/UpdateProfile';

function FacultyDashboard() {
  return (
    <div className="faculty-dashboard">
      <h1>Faculty Dashboard</h1>
      <ManageClassList />
      <UpdateProfile />
    </div>
  );
}

export default FacultyDashboard;
