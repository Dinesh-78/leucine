import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GraphDashboard() {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [facultyLoadData, setFacultyLoadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchDashboardData = async () => {
      try {
        const enrollmentResponse = await fetch('/api/admin/enrollment-trends'); 
        const facultyLoadResponse = await fetch('/api/admin/faculty-load');
        const enrollmentData = await enrollmentResponse.json();
        const facultyLoadData = await facultyLoadResponse.json();
        setEnrollmentData(enrollmentData);
        setFacultyLoadData(facultyLoadData);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Administrator Dashboard</h2>

      <h3>Student Enrollment Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={enrollmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="enrollment" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h3>Faculty Course Load</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={facultyLoadData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="courses" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphDashboard;
