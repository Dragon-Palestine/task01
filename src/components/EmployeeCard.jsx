import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = memo(({ employee, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="employee-card group"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/employee/${employee.id}`)}
    >
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {employee.name.charAt(0)}
          </div>
          <h3>{employee.name}</h3>
        </div>
        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(employee);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(employee.id);
            }}
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
});

export default EmployeeCard;
