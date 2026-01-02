import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", data.accessToken);
        return api(original);
      } catch (error) {
        window.location.href = "/login";
        console.log(error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
