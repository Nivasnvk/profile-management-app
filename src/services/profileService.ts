// src/services/profileService.ts
import axios from 'axios';
import { getBaseUrl } from '../utils/api';

const API_URL = `${getBaseUrl()}/profile`;

export const fetchProfile = async () => {
  const res = await axios.get(API_URL);
  return res.data.length ? res.data[0] : null;
};

export const createProfile = async (data: any) => {
  return axios.post(API_URL, data);
};

export const updateProfile = async (id: number, data: any) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteProfile = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
