import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StudentTable from "../components/StudentTable";
import { buildQuery, readJsonResponse } from "../lib/api";

const initialFilters = {
  search: "",
  grade: "",
  first_name: "",
  last_name: "",
  email: "",
  ordering: "-created_at",
  is_active: "",
  admin: false,
};

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({ count: 0, page: 1, page_size: 10, next: null, previous: null });
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const { authenticatedFetch, API_BASE_URL } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.successMessage) return;

    setSuccessMessage(location.state.successMessage);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!successMessage) return undefined;

    const timeoutId = window.setTimeout(() => setSuccessMessage(""), 4200);
    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const loadStudents = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = appliedFilters.admin ? "students/search/" : "students/";
      const query = buildQuery({
        page,
        page_size: meta.page_size,
        search: appliedFilters.search,
        grade: appliedFilters.grade,
        first_name: appliedFilters.first_name,
        last_name: appliedFilters.last_name,
        email: appliedFilters.email,
        ordering: appliedFilters.ordering,
        is_active: appliedFilters.admin ? appliedFilters.is_active : "",
      });
      const resp = await authenticatedFetch(`${API_BASE_URL}/${endpoint}?${query}`);
      const data = await readJsonResponse(resp, "Unable to fetch students.");
      setStudents(data.results || []);
      setMeta({
        count: data.count || 0,
        page: data.page || page,
        page_size: data.page_size || meta.page_size,
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, appliedFilters, authenticatedFetch, meta.page_size]);

  useEffect(() => {
    loadStudents(1);
  }, [loadStudents]);

  const updateFilter = (event) => {
    const { name, type, checked, value } = event.target;
    setDraftFilters((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    setAppliedFilters(draftFilters);
  };

  const clearFilters = () => {
    setDraftFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    try {
      const resp = await authenticatedFetch(`${API_BASE_URL}/students/${studentToDelete.id}/`, {
        method: "DELETE",
      });
      await readJsonResponse(resp, "Unable to delete student.");
      setSuccessMessage("Student deleted successfully.");
      setStudentToDelete(null);
      await loadStudents(meta.page);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRestore = async (studentId) => {
    try {
      const resp = await authenticatedFetch(`${API_BASE_URL}/students/${studentId}/restore/`, {
        method: "PATCH",
      });
      await readJsonResponse(resp, "Unable to restore student.");
      setSuccessMessage("Student restored successfully.");
      await loadStudents(meta.page);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-panel">
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>Search active records. Admin accounts can create, edit, delete, restore, and include inactive records.</p>
        </div>
        <div className="header-actions">
          <button className="btn secondary" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>

      <form className="filters-panel" onSubmit={applyFilters}>
        <label>
          <span>Search</span>
          <input name="search" value={draftFilters.search} onChange={updateFilter} placeholder="Name, email, phone, grade" />
        </label>
        <label>
          <span>Grade</span>
          <input name="grade" value={draftFilters.grade} onChange={updateFilter} placeholder="Example: 10" />
        </label>
        <label>
          <span>First name</span>
          <input name="first_name" value={draftFilters.first_name} onChange={updateFilter} />
        </label>
        <label>
          <span>Last name</span>
          <input name="last_name" value={draftFilters.last_name} onChange={updateFilter} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" value={draftFilters.email} onChange={updateFilter} />
        </label>
        <label>
          <span>Sort</span>
          <select name="ordering" value={draftFilters.ordering} onChange={updateFilter}>
            <option value="-created_at">Newest first</option>
            <option value="created_at">Oldest first</option>
            <option value="first_name">First name</option>
            <option value="last_name">Last name</option>
            <option value="grade">Grade</option>
          </select>
        </label>
        <label className="toggle-label">
          <input type="checkbox" name="admin" checked={draftFilters.admin} onChange={updateFilter} />
          <span>Include inactive</span>
        </label>
        <label>
          <span>Status</span>
          <select name="is_active" value={draftFilters.is_active} onChange={updateFilter} disabled={!draftFilters.admin}>
            <option value="">All statuses</option>
            <option value="true">Active only</option>
            <option value="false">Inactive only</option>
          </select>
        </label>
        <div className="filter-actions">
          <button type="submit" className="btn primary">
            Apply
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="toast success-toast" role="status">
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage("")} aria-label="Dismiss message">
            x
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : (
        <>
          {error && <div className="form-error">{error}</div>}
          <div className="result-bar">
            <span>{meta.count} record{meta.count === 1 ? "" : "s"}</span>
            <span>Page {meta.page}</span>
          </div>
          <StudentTable students={students} onDelete={handleDelete} onRestore={handleRestore} />
          <div className="pagination">
            <button className="btn secondary" disabled={!meta.previous} onClick={() => loadStudents(meta.page - 1)}>
              Previous
            </button>
            <button className="btn secondary" disabled={!meta.next} onClick={() => loadStudents(meta.page + 1)}>
              Next
            </button>
          </div>
        </>
      )}

      {studentToDelete && (
        <div className="modal-backdrop" role="presentation">
          <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <div className="confirm-icon">!</div>
            <div>
              <h3 id="delete-title">Delete student?</h3>
              <p>
                This will move{" "}
                <strong>
                  {studentToDelete.first_name} {studentToDelete.last_name}
                </strong>{" "}
                to inactive records.
              </p>
            </div>
            <div className="confirm-actions">
              <button type="button" className="btn secondary" onClick={() => setStudentToDelete(null)}>
                Cancel
              </button>
              <button type="button" className="btn danger" onClick={confirmDelete}>
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentListPage;
