import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// You can add other API-related methods (e.g., logoutUser, registerUser) here.
