import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/profile" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
