import React, { useState, useEffect } from 'react';

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching student data from the backend
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth'); // Replace with your actual API call
        const data = await response.json();
        setProfile(data[0]);
        console.log(data[0]);
      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div className="student-profile">
      <h2>{profile.name}'s Profile</h2>
      <img src={profile.photo} alt={`${profile.name}'s photo`} className="profile-photo" />
      <p><strong>Contact:</strong> {profile.phone}</p>

      <h3>Academic Information</h3>
      
      {/* <p><strong>Courses:</strong> {profile.courses.join(', ')}</p>
      <p><strong>Grades:</strong> {profile.grades}</p>
      <p><strong>Attendance:</strong> {profile.attendance}%</p> */}
    </div>
  );
}

export default StudentProfile;
