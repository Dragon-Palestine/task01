import React from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../features/notifications/notificationSlice";
import ToastItem from "./ToastItem";
import "./notifications.css";

const ToastContainer = () => {
  const notifications = useSelector(selectNotifications);

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <ToastItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default ToastContainer;
