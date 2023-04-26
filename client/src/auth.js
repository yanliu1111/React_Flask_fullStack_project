import { createAsyncAuthProvider } from "react-async-auth";
export const [useAuth, authFetch, login, logout] = createAsyncAuthProvider({
  accessTokenKey: "access_token",
  onUpdateToken: (token) =>
    fetch("/api/auth/refresh", {
      method: "POST",
      body: token.refresh_token,
    }).then((r) => r.json()),
});
