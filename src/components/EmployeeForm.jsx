import React, { useState, useEffect, useRef } from "react";

const EmployeeForm = ({ employee, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  // Refs for debounce timers
  const debounceTimers = useRef({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        name: "",
        email: "",
        department: "",
        role: "",
      });
    }
    setErrors({});
  }, [employee]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else if (value.trim().length > 50) {
          newErrors.name = "Name must be less than 50 characters";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "department":
        if (!value.trim()) {
          newErrors.department = "Department is required";
        } else if (value.trim().length < 2) {
          newErrors.department = "Department must be at least 2 characters";
        } else {
          delete newErrors.department;
        }
        break;
      case "role":
        if (!value.trim()) {
          newErrors.role = "Role is required";
        } else if (value.trim().length < 2) {
          newErrors.role = "Role must be at least 2 characters";
        } else {
          delete newErrors.role;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    } else if (formData.department.trim().length < 2) {
      newErrors.department = "Department must be at least 2 characters";
    }

    // Role validation
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    } else if (formData.role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error immediately when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear existing debounce timer for this field
    if (debounceTimers.current[name]) {
      clearTimeout(debounceTimers.current[name]);
    }

    // Set new debounce timer for validation
    debounceTimers.current[name] = setTimeout(() => {
      validateField(name, value);
    }, 1000); // 1 second delay
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter employee name"
            className={errors.name ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter employee email"
            className={errors.email ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Enter department"
            className={errors.department ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.department && (
            <span className="error-text">{errors.department}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Enter role"
            className={errors.role ? "input-error" : ""}
            disabled={isLoading}
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
