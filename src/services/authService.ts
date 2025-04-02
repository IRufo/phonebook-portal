import axios from 'axios';
import { getCookie } from '../utils/cacheCookie';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

interface ILoginPayload {
  email: string;
  password: string;
}

interface ILoginResponse {
  success: boolean;
  token: string;
  message: string
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | 'Super Admin';
}

interface IRegisterResponse {
  success: boolean;
  message: string;
  data: IUser
}


export const loginUser = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Login failed');
  }
};

export const registerUser = async (payload: IUser): Promise<IRegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Registration failed');
  }
};

export const verifyToken = async (): Promise<IRegisterResponse> => {
  try {
    const token = getCookie('token')
    console.log('token', token)
    const response = await axios.get(`${API_URL}/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Registration failed');
  }
};


