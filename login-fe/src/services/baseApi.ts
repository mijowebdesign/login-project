    import axios from 'axios';
    import qs from 'qs';

    const API_URL = import.meta.env.VITE_API_BASE_URL

    const filterEmptyValues = (obj: Record<string, any>) => {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        // Čistimo null, undefined i prazne stringove
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);
    };

    // Kreiramo instancu sa osnovnim podešavanjima
    const baseApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
  const cleanParams = filterEmptyValues(params);
  return qs.stringify(cleanParams, { arrayFormat: 'brackets' });
}

    });

    // Interceptori su korisni za automatsko rukovanje tokenima ili greškama
    baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout / redirect
    }
    return Promise.reject(error);
  })

    export default baseApi;