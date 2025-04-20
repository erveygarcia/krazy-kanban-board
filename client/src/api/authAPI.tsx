import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  // Make POST request to backend
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  // Handling incorrect answer
  if(!response.ok) {
    const errorData= await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  // Sending back received token
  const data= await response.json();
    return data.token;
  };

  export {login};
