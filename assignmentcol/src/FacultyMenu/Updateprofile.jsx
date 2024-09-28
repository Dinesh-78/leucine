import React, { useState, useEffect } from 'react';

function UpdateProfile() {
  const [profile, setProfile] = useState({
    officeHours: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simulate fetching current profile details from the backend
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/faculty/profile'); // Replace with your actual API
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    // Validate input (basic validation)
    if (!profile.officeHours || !profile.email || !profile.phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch('/api/faculty/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating.");
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="update-profile">
      <h2>Update Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Profile updated successfully!</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Office Hours:</label>
          <input
            type="text"
            name="officeHours"
            value={profile.officeHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
