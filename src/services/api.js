import axios from 'axios';

const baseURL = 'https://restcountries.com/v3.1';

const api = axios.create({
  baseURL,
});

export const fetchAllCountries = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const response = await api.get(`/name/${name}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error);
    throw error;
  }
};

export default api;