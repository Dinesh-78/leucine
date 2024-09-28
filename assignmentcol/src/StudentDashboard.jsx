import React from 'react';
import StudentProfile from './StudentMenu/StudentProfile';
import StudentSearch from './StudentMenu/StudentSearch';
import ContactAdvisors from './StudentMenu/ContactFaculty';
function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <StudentProfile />
      <StudentSearch />
      <ContactAdvisors />
    </div>
  );
}

export default StudentDashboard;
