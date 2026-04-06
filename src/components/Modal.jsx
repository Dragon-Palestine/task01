import React, { useState, useEffect, memo } from "react";

const Modal = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    submitText = "Save",
    isLoading = false,
    showFooter = true, // New prop to control footer visibility
  }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
        document.body.style.overflow = "hidden";
      } else {
        // Delay to allow exit animation
        setTimeout(() => setIsAnimating(false), 300);
        document.body.style.overflow = "unset";
      }

      const handleEscape = (e) => {
        if (e.key === "Escape" && !isLoading) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose, isLoading]);

    if (!isOpen && !isAnimating) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget && !isLoading) {
        onClose();
      }
    };

    return (
      <div
        className="modal-overlay"
        onClick={handleBackdropClick}
        style={{ display: isOpen || isAnimating ? "flex" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {isLoading && <div className="modal-loading-overlay" />}
          <div className="modal-header">
            <h2>{title}</h2>
            <button
              className="modal-close"
              onClick={onClose}
              disabled={isLoading}
              aria-label="Close modal"
            >
              {isLoading ? "⏳" : "×"}
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {showFooter && (
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default Modal;
