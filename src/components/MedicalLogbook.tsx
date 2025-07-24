import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { Dashboard } from "./Dashboard";
import { OperationForm } from "./OperationForm";

type View = "login" | "dashboard" | "add-operation";

export const MedicalLogbook = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("login");
  const [operations, setOperations] = useState<any[]>([]);

  console.log("MedicalLogbook rendered - currentUser:", currentUser, "currentView:", currentView, "operations:", operations);

  const handleLogin = (userId: string) => {
    console.log("handleLogin called with userId:", userId);
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
    console.log("handleSaveOperation called with operation:", operation);
    setOperations(prev => {
      const newOperations = [...prev, operation];
      console.log("Updated operations:", newOperations);
      return newOperations;
    });
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