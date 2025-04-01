import axios from 'axios';
import { getCookie } from '../utils/cacheCookie';

const API_URL = `${process.env.REACT_APP_API_URL}/share-contacts`;

interface IShareContactPayload {
  id?: string
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface IShareContactResponse {
  success: boolean;
  message: string;
  data: IShareContactPayload
}


export const shareContact = async (payload: IShareContactPayload): Promise<IShareContactResponse> => {
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
    throw new Error('Sharing of Contact Failed.');
  }
};

export const getShareContactById = async (id: string): Promise<IShareContactResponse> => {
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
    throw new Error('Fetching of Shared Contact Failed.');
  }
};

export const getShareContacts = async (): Promise<IShareContactResponse> => {
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
    throw new Error('Fetching of Shared Contacts Failed.');
  }
};

export const unshareContact = async (payload: IShareContactPayload): Promise<IShareContactResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.delete(`${API_URL}/${payload?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Unshare Contact Failed.');
  }
};

