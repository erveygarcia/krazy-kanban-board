import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<{ token: string }> => {
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

  // 🔹 NUEVO: Regresamos el token como objeto, para que el frontend lo use como res.token
  const token = await response.json();
  return { token };
};

export { login };
