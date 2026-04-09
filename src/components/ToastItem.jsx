import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../features/notifications/notificationSlice";

const ToastItem = ({ notification }) => {
  const dispatch = useDispatch();
  const { id, message, type, duration } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, dispatch]);

  return (
    <div className={`toast-item toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
        </span>
        <p>{message}</p>
      </div>
      <button
        className="toast-close"
        onClick={() => dispatch(removeNotification(id))}
      >
        &times;
      </button>
    </div>
  );
};

export default ToastItem;
