import React, { useState, useEffect } from 'react';

function ManageRecord() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    username: ''
  });
  const [action, setAction] = useState(null); // Track the current action: add, update, delete
  const [records, setRecords] = useState([]); // Store records for list view
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    // Fetch initial data for the records from API
    fetchRecords();
  }, []);

  // Function to fetch records from API
  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data); // Assuming the API returns an array of records
      } else {
        console.error('Failed to fetch records:', response.status);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // Function to handle the POST request to add data to the API
  const addRecord = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: form.id,
          username: form.username,
          password: form.password,
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role.toUpperCase(), // Ensure role is in uppercase
          studentProfile: null,
          facultyProfile: null,
          administratorProfile: null,
        }),
      });
      if (response.ok) {
        const newRecord = await response.json();
        setRecords([...records, newRecord]);
        console.log('Record added successfully');
      } else {
        console.error('Failed to add record:', response.status);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  // Function to handle the DELETE request to remove a record from the API
  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/records/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If deletion was successful, update local state
        setRecords(records.filter((record) => record.id !== id));
        console.log('Record deleted successfully');
      } else {
        console.error('Failed to delete record:', response.status);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'add') {
      console.log('Adding record', form);
      addRecord(); // Call the addRecord function to send data to the API
    } else if (action === 'update') {
      console.log('Updating record', form);
      // Implement update logic here (e.g., PUT request to API)
      const updatedRecords = records.map((rec) => (rec.id === form.id ? form : rec));
      setRecords(updatedRecords);
    } else if (action === 'delete') {
      console.log('Deleting record with ID:', form.id);
      deleteRecord(form.id); // Call deleteRecord function with the ID
    }

    // Reset form and action
    setForm({ id: '', name: '', email: '', password: '', phone: '', role: '', username: '' });
    setAction(null);
    setEditing(false);
  };

  // Handle editing a record
  const handleEdit = (record) => {
    setForm(record);
    setEditing(true);
    setAction('update');
  };

  // Handle deleting a record
  const handleDelete = (id) => {
    setForm({ id });
    setAction('delete');
    handleSubmit(new Event('submit')); // Simulate form submission
  };

  return (
    <div>
      <h2>Manage Record</h2>

      {/* Record List View */}
      <h3>Existing Records</h3>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.name} ({record.role}) - {record.email}
            <button onClick={() => handleEdit(record)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form for CRUD operations */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Enter ID"
            required
            disabled={action === 'add'}
          />
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            required
          />
        </div>

        {/* Buttons for different operations */}
        <div className="buttons">
          <button type="button" onClick={() => setAction('add')}>
            Add
          </button>
          {editing && (
            <button type="button" onClick={() => setAction('update')}>
              Update
            </button>
          )}
        </div>

        {/* Submit button */}
        <div>
          <button type="submit">
            {action ? `${action.charAt(0).toUpperCase() + action.slice(1)} Record` : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageRecord;
