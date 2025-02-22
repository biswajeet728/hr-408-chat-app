import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="bg-[#8BABD8] flex flex-col min-h-screen">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/sign-in"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
