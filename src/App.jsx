import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import "./index.css";

// Lazy load components for performance
const HomePage = lazy(() => import("./pages/HomePage"));
const EmployeeProfile = lazy(() => import("./pages/EmployeeProfile"));

function App() {
  return (
    <ThemeProvider>
      <EmployeeProvider>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/employee/:id" element={<EmployeeProfile />} />
              </Routes>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </EmployeeProvider>
    </ThemeProvider>
  );
}

export default App;
