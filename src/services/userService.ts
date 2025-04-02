import axios from 'axios';
import { getCookie } from '../utils/cacheCookie';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

interface IUserPayload {
  id?: string
  first_name: string,
  last_name: string,
  email: string,
  status: string
}

interface IUserResponse {
  success: boolean;
  message: string;
  data: IUserPayload;
}


export const createUser = async (payload: IUserPayload): Promise<IUserResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.post(`${API_URL}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Creation of Contact Failed.');
  }
};

export const getUserById = async (id: string): Promise<IUserResponse> => {
  try {

    const token = getCookie('token')
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Fetching of Contact Failed.');
  }
};

export const getUsers = async () => {
  try {
    const token = getCookie('token')
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Fetching of Contact Failed.');
  }
};

export const getUsersByStatus = async (status: string) => {
  try {
    const token = getCookie('token')
    const response = await axios.get(`${API_URL}/status/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Fetching of Contact Failed.');
  }
};

export const updateUser = async (payload: Partial<IUserPayload>): Promise<IUserResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.patch(`${API_URL}/${payload?.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Update of User Failed.');
  }
};

export const deleteUser = async (id: string): Promise<IUserResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Deletion of User Failed.');
  }
};


export const activateUser = async (id: string): Promise<IUserResponse> => {
  try {
    const token = getCookie('token')
    console.log('token', token)
    const response = await axios.patch(`${API_URL}/activate/${id}`, {}, {
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