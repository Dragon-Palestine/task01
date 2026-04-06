import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2rem",
      color: "#667eea",
      gap: "12px",
      flexDirection: "column",
      textAlign: "center",
      padding: "20px",
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
      }}
    />
    <div>{message}</div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;
