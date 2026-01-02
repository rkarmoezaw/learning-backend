import { useUser, useLogout } from "../hooks/useAuth";

export default function Profile() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>User Profile</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>User ID:</strong> {user?.id}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => logoutMutation.mutate()}
          style={{
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
