export function setToken(token: string) {
  sessionStorage.setItem("token", token);
}

export default function getToken(): string {
  return sessionStorage.getItem("token") || "";
}
