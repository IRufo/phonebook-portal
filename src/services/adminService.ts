import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const fetchPendingUsers = async () => {
  const response = await axios.get(`${API_URL}/pending-users`);
  return response.data;
};

export const approveUser = async (id: string) => {
  await axios.post(`${API_URL}/approve-user`, { id });
};
