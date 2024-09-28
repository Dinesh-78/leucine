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
  const [action, setAction] = useState(null); 
  const [records, setRecords] = useState([]); 
  const [editing, setEditing] = useState(false);


  useEffect(() => {
   
    fetchRecords();
  }, []);

  
  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data); 
      } else {
        console.error('Failed to fetch records:', response.status);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

 
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
          role: form.role.toUpperCase(), 
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

  
  const deleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/records/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
       
        setRecords(records.filter((record) => record.id !== id));
        console.log('Record deleted successfully');
      } else {
        console.error('Failed to delete record:', response.status);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'add') {
      console.log('Adding record', form);
      addRecord(); 
    } else if (action === 'update') {
      console.log('Updating record', form);
      
      const updatedRecords = records.map((rec) => (rec.id === form.id ? form : rec));
      setRecords(updatedRecords);
    } else if (action === 'delete') {
      console.log('Deleting record with ID:', form.id);
      deleteRecord(form.id); 
    }

    
    setForm({ id: '', name: '', email: '', password: '', phone: '', role: '', username: '' });
    setAction(null);
    setEditing(false);
  };

  
  const handleEdit = (record) => {
    setForm(record);
    setEditing(true);
    setAction('update');
  };

  
  const handleDelete = (id) => {
    setForm({ id });
    setAction('delete');
    handleSubmit(new Event('submit')); 
  };

  return (
    <div>
      <h2>Manage Record</h2>

     
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
