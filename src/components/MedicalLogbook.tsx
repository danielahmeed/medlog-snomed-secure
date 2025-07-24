import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";
import { OperationForm } from "./OperationForm";

type View = "login" | "dashboard" | "add-operation";

export const MedicalLogbook = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("login");
  const [operations, setOperations] = useState<any[]>([]);

  const handleLogin = (userId: string) => {
    setCurrentUser(userId);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("login");
  };

  const handleAddOperation = () => {
    setCurrentView("add-operation");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleSaveOperation = (operation: any) => {
    setOperations(prev => [...prev, operation]);
    setCurrentView("dashboard");
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (currentView === "add-operation") {
    return (
      <OperationForm
        onBack={handleBackToDashboard}
        onSave={handleSaveOperation}
      />
    );
  }

  return (
    <Dashboard
      userId={currentUser}
      onLogout={handleLogout}
      onAddOperation={handleAddOperation}
      operations={operations}
    />
  );
};