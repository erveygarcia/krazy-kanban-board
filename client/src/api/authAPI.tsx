import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  // 🔹 NUEVO: Guardamos la URL base en una constante para mayor claridad y reutilización
  const API = import.meta.env.VITE_API_BASE_URL;

  // Make POST request to backend
  const response = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  // Handling incorrect answer
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  // Sending back received token
  const data = await response.json();

  // ✅ NUEVO: en lugar de retornar sólo el token, lo devolvemos como objeto con clave `token`
  return { token: data.token };
};

export { login };
