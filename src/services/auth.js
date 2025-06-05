import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password
    });

    // Si le backend renvoie un token, on le retourne
    return response.data.token;
  } catch (error) {
    throw new Error('Identifiants invalides');
  }
};

export default { login };
