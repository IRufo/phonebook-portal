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


export const shareContact = async (payload: {
  owner_id: string,
  shared_with_user_id: string,
  contact_id: string
}): Promise<IShareContactResponse> => {
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

export const getContactsSharedWithMe = async () => {
  try {
    const token = getCookie('token')
    const response = await axios.get(`${API_URL}/shared-with-me`, {
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

export const getSharedContacts = async () => {
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

export const unshareContact = async ({contact_id, owner_id}:{contact_id: string, owner_id: string}): Promise<IShareContactResponse> => {
  try {
    const token = getCookie('token')
    const response = await axios.patch(`${API_URL}/unshare/${contact_id}`, {owner_id: owner_id || 's'},{
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

