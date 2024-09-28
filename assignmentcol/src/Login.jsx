import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); 
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        if (role === 'Student') {
          console.log("student entering");
          navigate('/student'); 
        } else if (role === 'Faculty Member') {
          navigate('/faculty');
        } else if (role === 'Administrator') {
          navigate('/admin');
        }
      } else {
        setError(data.message || "An error occurred during login.");
      }
    } catch (err) {
      console.log("error occurred");
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Faculty Member">Faculty Member</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
