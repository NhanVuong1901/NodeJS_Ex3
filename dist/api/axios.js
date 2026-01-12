import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:9999/api",
    withCredentials: true, // 👈 để gửi refresh cookie
});
let accessToken = null;
export function setAccessToken(token) {
    accessToken = token;
}
// attach access token
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
// refresh token khi 401
api.interceptors.response.use((res) => res, async (error) => {
    const original = error.config;
    if (error.response?.status === 401 &&
        !original._retry) {
        original._retry = true;
        try {
            const res = await api.post("/auth/refresh");
            setAccessToken(res.data.data.accessToken);
            return api(original);
        }
        catch {
            setAccessToken(null);
            window.location.href = "/login";
        }
    }
    return Promise.reject(error);
});
export default api;
//# sourceMappingURL=axios.js.map