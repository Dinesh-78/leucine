import React from 'react';
import ManageRecords from './AdminMenu/ManageRecord';
import Graphdashboard from './AdminMenu/GraphDashboard';

function AdminDashboard() {
  return (
    <div className="admin-interface">
      <h1>Administrator Interface</h1>
      <ManageRecords />
      {/* <Graphdashboard /> */}
    </div>
  );
}

export default AdminDashboard;
