import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06091a] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500" />

          <p className="mt-4 text-sm text-slate-400">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
