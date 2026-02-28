import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import PageLoder from "./components/pageLoder.jsx";
import SignUpPage from "./pages/SignUpPage";
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore.js";

const App = () => {
  const { checkAuth, isCheckinghAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckinghAuth) {
    return <PageLoder />;
  }
  return (
    <div>
      <Routes>
        <Route
          index
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
