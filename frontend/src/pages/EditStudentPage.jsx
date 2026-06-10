import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StudentForm from "../components/StudentForm";
import { readJsonResponse } from "../lib/api";

function EditStudentPage() {
  const { id } = useParams();
  const { authenticatedFetch, API_BASE_URL } = useAuth();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const resp = await authenticatedFetch(`${API_BASE_URL}/students/${id}/`);
        const data = await readJsonResponse(resp, "Unable to load student.");
        setInitialData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadStudent();
  }, [API_BASE_URL, authenticatedFetch, id]);

  const handleSubmit = async (values) => {
    setBusy(true);
    setError("");
    try {
      const resp = await authenticatedFetch(`${API_BASE_URL}/students/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await readJsonResponse(resp, "Failed to update student.");
      navigate("/students", {
        replace: true,
        state: { successMessage: "Student updated successfully." },
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
          <h2>Edit Student</h2>
          <p>Update student information and save changes to the backend.</p>
        </div>
      </div>
      {error && <div className="form-error">{error}</div>}
      {initialData ? (
        <StudentForm initialValues={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" busy={busy} />
      ) : (
        <div className="loading">Loading student details...</div>
      )}
    </div>
  );
}

export default EditStudentPage;
