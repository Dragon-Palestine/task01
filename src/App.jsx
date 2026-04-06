import React from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <HomePage />
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default App;
