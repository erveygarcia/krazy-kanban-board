import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI'; // asegúrate que esta función esté bien implementada
import '../index.css'; // o tu archivo global de estilos
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login(formData);
            if (res.token) {
                localStorage.setItem('id_token', res.token);
                console.log("✅ Token saved:", res.token);
                navigate('/');
            }
            else {
                setError('Invalid username or password');
            }
        }
        catch (err) {
            setError('Login failed');
        }
    };
    return (_jsx("div", { className: "login-page", children: _jsxs("form", { className: "login-form", onSubmit: handleSubmit, children: [_jsx("h1", { children: "Welcome back" }), _jsx("p", { className: "subtext", children: "Please enter your details" }), _jsx("label", { htmlFor: "username", children: "Username" }), _jsx("input", { type: "text", name: "username", id: "username", value: formData.username, onChange: handleChange, required: true, autoComplete: "username" // ✅ NUEVO: mejora UX del navegador
                 }), _jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", name: "password", id: "password", value: formData.password, onChange: handleChange, required: true, autoComplete: "current-password" // ✅ NUEVO: evita warnings de navegador
                 }), error && _jsx("p", { className: "error", children: error }), _jsx("button", { type: "submit", children: "Login" })] }) }));
};
export default Login;
