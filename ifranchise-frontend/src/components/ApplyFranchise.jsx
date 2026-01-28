import { useEffect, useState } from "react";

export default function ApplyFranchise() {
  const [open, setOpen] = useState(false);
  const [concept, setConcept] = useState("Select Concept");
  const [civilOpen, setCivilOpen] = useState(false);
  const [civilStatus, setCivilStatus] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    date: "",
    paymentMode: "",
    applicantName: "",
    dob: "",
    dependents: "",
    gender: "",
    nationality: "",
    mobile: "",
    address: "",
    email: "",
    spouseName: "",
    spouseOccupation: "",
    employmentType: "",
    yearsEmployer: "",
    income: "",
    employerName: "",
    businessAddress: "",
    position: "",
    businessNature: "",
    signature: "",
    dateSigned: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, date: today, dateSigned: today }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const concepts = [
    "Coffee Spot Outdoor Kiosk",
    "Coffee Spot Full Store",
    "iPharma Mart",
    "Food Caravan",
    "Dodram Luncheon Meat",
    "Coffee Spot Products",
    "Kwezen",
  ];

  const civilStatuses = ["Single", "Married", "Widowed", "Separated"];

  const validate = () => {
    let e = {};

    Object.keys(form).forEach((key) => {
      if (!form[key]) e[key] = "Required";
    });

    if (concept === "Select Concept") e.concept = "Required";
    if (!civilStatus) e.civilStatus = "Required";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Invalid email";
    }

    if (form.mobile && (form.mobile.length < 10 || isNaN(form.mobile))) {
      e.mobile = "Invalid mobile number";
    }

    if (civilStatus === "Single") {
      delete e.spouseName;
      delete e.spouseOccupation;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitForm = () => {
    if (!validate()) {
      alert("Please fix the errors before submitting.");
      return;
    }
    alert("Application submitted successfully!");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img
          src="/assets/ifranchise_logo.png"
          alt="iFranchise"
          style={styles.logo}
        />

        <h2 style={styles.header}>iFranchise Application Form</h2>

        <div style={styles.row}>
          <div style={styles.col}>
            <label>Date</label>
            <input style={styles.inputDisabled} value={form.date} disabled />
          </div>
          <div style={styles.col}>
            <label>Mode of Payment</label>
            <input
              style={styles.input}
              name="paymentMode"
              value={form.paymentMode}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Chosen Concept</label>
        <div style={styles.dropdown} onClick={() => setOpen(!open)}>
          {concept}
        </div>
        {errors.concept && <p style={styles.error}>Required</p>}

        {open && (
          <div style={styles.dropdownList}>
            {concepts.map((c) => (
              <div
                key={c}
                style={styles.dropdownItem}
                onClick={() => {
                  setConcept(c);
                  setOpen(false);
                }}
              >
                {c}
              </div>
            ))}
          </div>
        )}

        <h3 style={styles.section}>APPLICANT INFORMATION</h3>

        <label>Applicant Name</label>
        <input
          style={styles.input}
          name="applicantName"
          value={form.applicantName}
          onChange={handleChange}
        />

        <div style={styles.row}>
          <div style={styles.col}>
            <label>Date of Birth</label>
            <input
              style={styles.input}
              name="dob"
              placeholder="YYYY-MM-DD"
              value={form.dob}
              onChange={handleChange}
            />
          </div>
          <div style={styles.col}>
            <label>Civil Status</label>
            <div
              style={styles.input}
              onClick={() => setCivilOpen(!civilOpen)}
            >
              {civilStatus || "Select"}
            </div>
          </div>
        </div>

        {civilOpen && (
          <div style={styles.dropdownList}>
            {civilStatuses.map((c) => (
              <div
                key={c}
                style={styles.dropdownItem}
                onClick={() => {
                  setCivilStatus(c);
                  setCivilOpen(false);
                }}
              >
                {c}
              </div>
            ))}
          </div>
        )}

        {civilStatus && civilStatus !== "Single" && (
          <>
            <h3 style={styles.section}>SPOUSE INFORMATION</h3>
            <input
              style={styles.input}
              placeholder="Spouse Name"
              name="spouseName"
              value={form.spouseName}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              placeholder="Spouse Occupation"
              name="spouseOccupation"
              value={form.spouseOccupation}
              onChange={handleChange}
            />
          </>
        )}

        <h3 style={styles.section}>EMPLOYMENT</h3>

        <input
          style={styles.input}
          placeholder="Employment Type"
          name="employmentType"
          value={form.employmentType}
          onChange={handleChange}
        />

        <h3 style={styles.section}>CERTIFICATION</h3>
        <p style={styles.cert}>
          I/We certify that all information provided is true and correct.
        </p>

        <button style={styles.submitBtn} onClick={submitForm}>
          SUBMIT APPLICATION
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#eef7f1",
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  logo: {
    width: 180,
    display: "block",
    margin: "0 auto 10px",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    gap: 10,
  },
  col: {
    flex: 1,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 10,
  },
  inputDisabled: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
    border: "1px solid #ccc",
    marginBottom: 10,
  },
  dropdown: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 5,
  },
  dropdownList: {
    border: "1px solid #ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  cert: {
    fontSize: 14,
    lineHeight: "20px",
  },
  submitBtn: {
    marginTop: 20,
    width: "100%",
    padding: 14,
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
