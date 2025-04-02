import axios from 'axios';
import { getCookie } from '../utils/cacheCookie';

const API_URL = `${process.env.REACT_APP_API_URL}/contacts`;

interface IContactPayload {
  id: string
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string
}

interface IContactResponse {
  success: boolean;
  message: string;
  data: IContactPayload | IContactPayload[]
}


export const createContact = async (payload: IContactPayload): Promise<IContactResponse> => {
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

export const getContactById = async (id: string): Promise<IContactResponse> => {
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

export const getContacts = async () => {
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
    throw new Error('Fetching of Contacts Failed.');
  }
};

export const updateContact = async (payload: IContactPayload): Promise<IContactResponse> => {
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
    throw new Error('Update of Contact Failed.');
  }
};

export const deleteContact = async ({id, owner_id}:{id: string, owner_id: string}): Promise<IContactResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.patch(`${API_URL}/delete/${id}`,{ owner_id}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data; 
    }
    throw new Error('Deletion of Contact Failed.');
  }
};


