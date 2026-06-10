import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StudentForm from "../components/StudentForm";
import { readJsonResponse } from "../lib/api";

function AddStudentPage() {
  const { authenticatedFetch, API_BASE_URL } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (values) => {
    setBusy(true);
    setError("");
    try {
      const resp = await authenticatedFetch(`${API_BASE_URL}/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await readJsonResponse(resp, "Failed to create student.");
      navigate("/students", {
        replace: true,
        state: { successMessage: "Student added successfully." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-panel">
      <div className="page-header">
        <div>
          <h2>Add Student</h2>
          <p>Enter student details and save them to the backend roster.</p>
        </div>
      </div>
      {error && <div className="form-error">{error}</div>}
      <StudentForm submitLabel="Create Student" onSubmit={handleSubmit} busy={busy} />
    </div>
  );
}

export default AddStudentPage;
