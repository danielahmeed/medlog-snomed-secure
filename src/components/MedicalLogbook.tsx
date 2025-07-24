import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";

export const MedicalLogbook = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (userId: string) => {
    setCurrentUser(userId);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard userId={currentUser} onLogout={handleLogout} />;
};