import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.email}</h1>
      <p>You are now logged in to the dashboard.</p>
    </div>
  );
};

export default Dashboard;
