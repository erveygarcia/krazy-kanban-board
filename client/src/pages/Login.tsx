import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI'; // asegúrate que esta función esté bien implementada
import '../index.css'; // o tu archivo global de estilos

const Login = () => {
  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(formData);
      if (res.token) {
        localStorage.setItem('id_token', res.token);
        console.log("✅ Token saved:", res.token);
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="subtext">Please enter your details</p>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username" // ✅ NUEVO: mejora UX del navegador
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password" // ✅ NUEVO: evita warnings de navegador
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
