import React, { useState } from 'react';

function StudentSearch() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('name');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

   
    const response = await fetch(`/api/student/search?query=${query}&filter=${filter}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="student-search">
      <h2>Search for Students</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="name">Name</option>
          <option value="department">Department</option>
          <option value="year">Year</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {results.length > 0 ? (
        <div className="search-results">
          <h3>Results:</h3>
          <ul>
            {results.map((student) => (
              <li key={student.id}>
                <strong>{student.name}</strong> - {student.department}, Year {student.year}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default StudentSearch;
