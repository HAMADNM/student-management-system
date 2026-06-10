import { useState } from "react";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  grade: "",
  address: "",
};

function StudentForm({ initialValues = initialState, onSubmit, submitLabel, busy = false }) {
  const [values, setValues] = useState(() => ({ ...initialState, ...initialValues }));
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().slice(0, 10);

  const validate = () => {
    const nextErrors = {};

    if (!values.first_name.trim()) nextErrors.first_name = "First name is required.";
    if (!values.last_name.trim()) nextErrors.last_name = "Last name is required.";
    if (!values.email.trim()) nextErrors.email = "Email is required.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.date_of_birth) nextErrors.date_of_birth = "Date of birth is required.";
    if (values.date_of_birth && values.date_of_birth > today) {
      nextErrors.date_of_birth = "Date of birth cannot be in the future.";
    }
    if (!values.grade.trim()) nextErrors.grade = "Grade is required.";
    if (values.phone && !/^\d+$/.test(values.phone)) {
      nextErrors.phone = "Phone must contain only digits.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      {[
        { label: "First Name", name: "first_name", type: "text" },
        { label: "Last Name", name: "last_name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
        { label: "Date of Birth", name: "date_of_birth", type: "date" },
        { label: "Grade", name: "grade", type: "text" },
      ].map((field) => (
        <label key={field.name}>
          <span>{field.label}</span>
          <input
            type={field.type}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            max={field.type === "date" ? today : undefined}
          />
          {errors[field.name] && <small className="field-error">{errors[field.name]}</small>}
        </label>
      ))}

      <label className="full-field">
        <span>Address</span>
        <textarea name="address" value={values.address} onChange={handleChange} rows={4} />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={busy}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
