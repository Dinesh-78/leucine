import React, { useState, useEffect } from 'react';

function ManageClassList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchClassList = async () => {
      try {
        const response = await fetch('/api/faculty/class-list'); 
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError("Failed to load class list.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassList();
  }, []);

  if (loading) {
    return <p>Loading class list...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (students.length === 0) {
    return <p>No students enrolled in your courses.</p>;
  }

  return (
    <div className="manage-class-list">
      <h2>Class List</h2>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <img src={student.photo} alt={`${student.name}'s photo`} className="student-photo" />
              </td>
              <td>{student.name}</td>
              <td>
                <a href={`mailto:${student.email}`}>{student.email}</a> <br />
                <a href={`tel:${student.phone}`}>{student.phone}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageClassList;
