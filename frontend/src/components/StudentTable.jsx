import { Link } from "react-router-dom";

function StudentTable({ students, onDelete, onRestore }) {
  if (students.length === 0) {
    return <div className="empty-state">No students found.</div>;
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Grade</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <strong>{student.first_name} {student.last_name}</strong>
              </td>
              <td>{student.email}</td>
              <td>{student.grade}</td>
              <td>{student.phone || "-"}</td>
              <td>
                <span className={student.is_active ? "status active" : "status inactive"}>
                  {student.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="actions-col">
                <div className="row-actions">
                  {student.is_active && (
                    <Link className="btn small" to={`/students/${student.id}/edit`}>
                      Edit
                    </Link>
                  )}
                  {student.is_active ? (
                    <button className="btn danger small" onClick={() => onDelete(student)}>
                      Delete
                    </button>
                  ) : (
                    <button className="btn secondary small" onClick={() => onRestore(student.id)}>
                      Restore
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
