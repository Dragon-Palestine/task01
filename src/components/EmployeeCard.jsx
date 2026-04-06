import React, { useState } from "react";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(employee);

  const handleSave = () => {
    onEdit(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(employee);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  if (isEditing) {
    return (
      <div className="employee-card editing">
        <div className="card-header">
          <h3>Edit Employee</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={editForm.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={editForm.role}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>{employee.name}</h3>
        <div className="card-actions">
          <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="card-body">
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Role:</strong> {employee.role}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
