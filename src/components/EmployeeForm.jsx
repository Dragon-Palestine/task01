import React, { useState, useEffect, useRef, memo } from "react";
import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants";

const EmployeeForm = memo(({ employee, onSubmit, isLoading }) => {
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
          newErrors.name = ERROR_MESSAGES.NAME_REQUIRED;
        } else if (value.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
          newErrors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
        } else if (value.trim().length > VALIDATION_RULES.NAME.MAX_LENGTH) {
          newErrors.name = ERROR_MESSAGES.NAME_TOO_LONG;
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
        } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
          newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
        } else {
          delete newErrors.email;
        }
        break;
      case "department":
        if (!value.trim()) {
          newErrors.department = ERROR_MESSAGES.DEPARTMENT_REQUIRED;
        } else if (
          value.trim().length < VALIDATION_RULES.DEPARTMENT.MIN_LENGTH
        ) {
          newErrors.department = ERROR_MESSAGES.DEPARTMENT_TOO_SHORT;
        } else {
          delete newErrors.department;
        }
        break;
      case "role":
        if (!value.trim()) {
          newErrors.role = ERROR_MESSAGES.ROLE_REQUIRED;
        } else if (value.trim().length < VALIDATION_RULES.ROLE.MIN_LENGTH) {
          newErrors.role = ERROR_MESSAGES.ROLE_TOO_SHORT;
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
      newErrors.name = ERROR_MESSAGES.NAME_REQUIRED;
    } else if (formData.name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
      newErrors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
    } else if (formData.name.trim().length > VALIDATION_RULES.NAME.MAX_LENGTH) {
      newErrors.name = ERROR_MESSAGES.NAME_TOO_LONG;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = ERROR_MESSAGES.DEPARTMENT_REQUIRED;
    } else if (
      formData.department.trim().length < VALIDATION_RULES.DEPARTMENT.MIN_LENGTH
    ) {
      newErrors.department = ERROR_MESSAGES.DEPARTMENT_TOO_SHORT;
    }

    // Role validation
    if (!formData.role.trim()) {
      newErrors.role = ERROR_MESSAGES.ROLE_REQUIRED;
    } else if (formData.role.trim().length < VALIDATION_RULES.ROLE.MIN_LENGTH) {
      newErrors.role = ERROR_MESSAGES.ROLE_TOO_SHORT;
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

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    // Validate immediately on blur
    validateField(name, value);
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
            onBlur={handleInputBlur}
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
            onBlur={handleInputBlur}
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
            onBlur={handleInputBlur}
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
            onBlur={handleInputBlur}
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
});

export default EmployeeForm;
