import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { buildQuery, readJsonResponse } from "../lib/api";

function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, active: 0, grades: 0, newest: "-" });
  const [newestStudents, setNewestStudents] = useState([]);
  const [error, setError] = useState("");
  const { authenticatedFetch, API_BASE_URL } = useAuth();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const query = buildQuery({ page: 1, page_size: 5, ordering: "-created_at" });
        const resp = await authenticatedFetch(`${API_BASE_URL}/students/?${query}`);
        const data = await readJsonResponse(resp, "Unable to load student list.");
        const results = data.results || [];
        setStats({
          total: data.count || 0,
          active: results.filter((student) => student.is_active).length,
          grades: new Set(results.map((student) => student.grade).filter(Boolean)).size,
          newest: results[0] ? `${results[0].first_name} ${results[0].last_name}` : "-",
        });
        setNewestStudents(results.slice(0, 5));
      } catch (err) {
        setError(err.message);
      }
    };

    loadStats();
  }, [API_BASE_URL, authenticatedFetch]);

  return (
    <div className="page-panel dashboard-panel">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Backend-connected overview of the active student roster.</p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card primary-card">
          <span>Total Students</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card secondary-card">
          <span>Active On This Page</span>
          <strong>{stats.active}</strong>
        </div>
        <div className="stat-card teal-card">
          <span>Grades On This Page</span>
          <strong>{stats.grades}</strong>
        </div>
        <div className="stat-card gold-card">
          <span>Newest Record</span>
          <strong className="text-stat">{stats.newest}</strong>
        </div>
      </div>
      <section className="newest-panel">
        <div className="section-header">
          <h3>Newest 5 Students</h3>
        </div>
        {newestStudents.length ? (
          <div className="newest-list">
            {newestStudents.map((student) => (
              <div className="newest-item" key={student.id}>
                <div className="student-avatar">
                  {student.first_name?.[0]}
                  {student.last_name?.[0]}
                </div>
                <div>
                  <strong>
                    {student.first_name} {student.last_name}
                  </strong>
                  <span>{student.email}</span>
                </div>
                <span className="grade-pill">Grade {student.grade}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No recent students found.</div>
        )}
      </section>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default DashboardPage;
