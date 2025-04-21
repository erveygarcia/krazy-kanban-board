// TODO: make a POST request to the login route
const login = async (userInfo) => {
    // 🔹 NUEVO: Constante con la URL base del backend
    const API = import.meta.env.VITE_API_BASE_URL;
    // 🔹 POST al backend
    const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    });
    // 🔹 Si hay error, lanzamos mensaje
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }
    // ✅ NUEVO: Regresamos un objeto con `token`
    const data = await response.json();
    return { token: data.token };
};
export { login };
