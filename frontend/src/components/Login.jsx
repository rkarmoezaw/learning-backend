import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/profile"); // Redirect after success
        },
      }
    );
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginMutation.isError && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {loginMutation.error.response?.data?.message || "Login failed"}
        </p>
      )}
    </div>
  );
}
