import React, { Suspense, lazy } from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

// Lazy load the HomePage component
const HomePage = lazy(() => import("./pages/HomePage"));

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2rem",
      color: "#667eea",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #667eea",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginRight: "10px",
      }}
    ></div>
    Loading...
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        </ErrorBoundary>
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default App;
