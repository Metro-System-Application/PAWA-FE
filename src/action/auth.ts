import { API } from "@/utils/axiosClient";
import { jwtDecode } from "jwt-decode"

export async function login(data: { email: string; password: string }) {
  const response = await API.post("/auth/login", {
    email: data.email,
    password: data.password,
  });

  // const decodingData = jwtDecode<JWTPayload>()
}

export async function getUserData() {
  const response = await API.get("/profile/my-info", { withCredentials: true });

  return response.data;
}

export async function getGoogleAuthLink() {
  const response = await API.get("/auth/google-signup-url");
  return response.data.data.redirectUrl;
}

export async function googleAuth(code: string) {
  const response = await API.get(`/auth/google?code=${code}`);
  return response.data;
} 