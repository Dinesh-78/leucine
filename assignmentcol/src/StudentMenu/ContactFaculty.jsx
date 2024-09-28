import React, { useState, useEffect } from 'react';

function ContactAdvisors() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchAdvisors = async () => {
      try {
        const response = await fetch('/api/student/advisors'); 
        const data = await response.json();
        setAdvisors(data);
      } catch (err) {
        setError("Failed to load advisor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  if (loading) {
    return <p>Loading advisors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (advisors.length === 0) {
    return <p>No assigned faculty advisors found.</p>;
  }

  return (
    <div className="contact-advisors">
      <h2>Contact Faculty Advisors</h2>
      <ul>
        {advisors.map((advisor) => (
          <li key={advisor.id} className="advisor-item">
            <p><strong>Name:</strong> {advisor.name}</p>
            <p><strong>Department:</strong> {advisor.department}</p>
            <p><strong>Email:</strong> <a href={`mailto:${advisor.email}`}>{advisor.email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${advisor.phone}`}>{advisor.phone}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactAdvisors;
