import React, { Suspense, lazy } from "react";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import "./index.css";

// Lazy load the HomePage component
const HomePage = lazy(() => import("./pages/HomePage"));

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
