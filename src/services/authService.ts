import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

interface ILoginPayload {
  email: string;
  password: string;
}

interface ILoginResponse {
  success: boolean;
  token: string;
}

interface IRegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface IRegisterResponse {
  success: boolean;
  message: string;
}


export const loginUser = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const registerUser = async (payload: IRegisterPayload): Promise<IRegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

