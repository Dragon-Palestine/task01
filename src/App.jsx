import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import "./index.css";

// Lazy load components for performance
const HomePage = lazy(() => import("./pages/HomePage"));
const EmployeeProfile = lazy(() => import("./pages/EmployeeProfile"));

function App() {
  return (
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
  );
}

export default App;
