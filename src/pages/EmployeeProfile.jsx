import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectEmployeesData,
  selectEmployeesState,
} from "../features/employees/employeesSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = useSelector(selectEmployeesData);
  const { isPageLoading, isMutating } = useSelector(selectEmployeesState);

  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsSimulating(true);
    const timer = setTimeout(() => setIsSimulating(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const isLoading = isPageLoading || isMutating || isSimulating;

  const employee = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((emp) => String(emp.id) === String(id));
  }, [data, id]);

  if (isLoading) {
    return <LoadingSpinner message="Fetching employee data..." />;
  }

  if (!employee) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>Employee Not Found</p>
        <Link to="/" className="btn primary">
          Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
          background: #f9fafb;
        }

        .page {
          padding: 40px 20px;
          display: flex;
          justify-content: center;
        }

        .container {
          width: 100%;
          max-width: 800px;
        }

        .top {
          margin-bottom: 20px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 10px;
          background: white;
          border: 1px solid #ddd;
          cursor: pointer;
          transition: 0.2s;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }

        .cover {
          height: 140px;
          background: linear-gradient(to right, #2563eb, #7c3aed);
        }

        .content {
          padding: 25px;
        }

        /* ✅ Alignment fixed here */
        .header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-top: -60px;
          margin-bottom: 25px;
        }

        .avatar {
          width: 110px;
          height: 110px;
          border-radius: 20px;
          background: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          font-weight: bold;
          border: 5px solid white;
          flex-shrink: 0;
        }

        /* ✅ The actual fix is here */
        .info {
          display: flex;
          flex-direction: column;
        }

        .name {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 6px;
        }

        .status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 10px;
          font-size: 12px;
          width: fit-content;
          margin-bottom: 6px;
        }

        .status.active {
          background: #dcfce7;
          color: green;
        }

        .status.inactive {
          background: #fee2e2;
          color: red;
        }

        .role {
          color: gray;
          font-size: 15px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .box {
          padding: 18px;
          border-radius: 15px;
          background: #f3f4f6;
          transition: 0.2s;
        }

        .box:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .label {
          font-size: 12px;
          color: gray;
        }

        .value {
          font-weight: bold;
          margin-top: 5px;
          font-size: 16px;
        }

        .full {
          grid-column: span 2;
        }

        .not-found {
          text-align: center;
          padding: 100px;
        }

        .btn {
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
        }

        .btn.primary {
          background: #4f46e5;
          color: white;
        }
      `}</style>

      <div className="page">
        <div className="container">
          {/* Back */}
          <div className="top">
            <button onClick={() => navigate("/")} className="back-btn">
              ← Back
            </button>
          </div>

          {/* Card */}
          <div className="card">
            <div className="cover"></div>

            <div className="content">
              <div className="header">
                <div className="avatar">
                  {employee.name.charAt(0).toUpperCase()}
                </div>

                <div className="info">
                  <div
                    className="name"
                    style={{
                      fontSize: "26px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {employee.name}
                  </div>

                  <div className={`status ${employee.status}`}>
                    {employee.status}
                  </div>

                  <div className="role">{employee.role}</div>
                </div>
              </div>

              <div className="grid">
                <div className="box">
                  <div className="label">Department</div>
                  <div className="value">{employee.department}</div>
                </div>

                <div className="box">
                  <div className="label">Email</div>
                  <div className="value">{employee.email}</div>
                </div>

                <div className="box full">
                  <div className="label">Employee ID</div>
                  <div className="value">EMP-{employee.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
