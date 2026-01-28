import React, { useState, useEffect } from "react";

export default function IPharmaForm() {
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    date: "",
    address: "",
    mobile: "",
    telephone: "",
    email: "",
    dob: "",
    maritalStatus: "",
    spouseName: "",
    spouseOccupation: "",
    spouseDob: "",
    dependents: "",
    tin: "",
    education: "",

    involvement: "",
    equity: "",
    investment: "",
    fundSource: "",
    otherBusiness: "",
    location: "",
    customerExperience: "",
    successReason: "",
    systemsExperience: "",
    difficultiesPlan: "",

    familyDepend: "",
    incomeExpectation: "",
    otherIncome: "",
    marketArea: "",
    startDate: "",
    criminal: "",
    criminalDetails: "",
    pending: "",
    pendingDetails: "",
    signature: "",
    dateSigned: "",
  });

  const [errors, setErrors] = useState({});

  // Auto-fill date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, date: today, dateSigned: today }));
  }, []);

  const showSpouse =
    form.maritalStatus === "Married" || form.maritalStatus === "Widowed";

  /* ================= VALIDATIONS ================= */
  const validatePage1 = () => {
    let e = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!form.name) e.name = "Required";
    if (!form.date) e.date = "Required";
    if (!form.address) e.address = "Required";

    if (!form.mobile) e.mobile = "Required";
    else if (form.mobile.length < 10) e.mobile = "Invalid number";

    if (!form.email) e.email = "Required";
    else if (!emailRegex.test(form.email)) e.email = "Invalid email";

    if (!form.dob) e.dob = "Required";
    else if (!dateRegex.test(form.dob)) e.dob = "Use YYYY-MM-DD";

    if (!form.maritalStatus) e.maritalStatus = "Required";
    if (!form.education) e.education = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePage2 = () => {
    let e = {};
    if (!form.involvement) e.involvement = "Required";
    if (!form.equity) e.equity = "Required";
    if (!form.investment) e.investment = "Required";
    if (!form.fundSource) e.fundSource = "Required";
    if (!form.location) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePage3 = () => {
    let e = {};
    if (!form.familyDepend) e.familyDepend = "Required";
    if (!form.marketArea) e.marketArea = "Required";
    if (!form.startDate) e.startDate = "Required";
    if (!form.signature) e.signature = "Required";
    if (!form.dateSigned) e.dateSigned = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= FORM INPUT HANDLER ================= */
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img
          src="/assets/ipharma_logo.png"
          alt="iPharma Logo"
          style={styles.logo}
        />
        <h2 style={styles.title}>iPharma Application Form</h2>

        {/* PAGE 1 */}
        {page === 1 && (
          <>
            <h3 style={styles.section}>APPLICANT INFORMATION</h3>

            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChange={handleChange("name")}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}

            <label style={styles.label}>Date</label>
            <input
              style={{ ...styles.input, backgroundColor: "#f0f0f0" }}
              value={form.date}
              readOnly
            />
            {errors.date && <span style={styles.error}>{errors.date}</span>}

            <label style={styles.label}>Address</label>
            <input
              style={styles.input}
              placeholder="Address"
              value={form.address}
              onChange={handleChange("address")}
            />
            {errors.address && <span style={styles.error}>{errors.address}</span>}

            <div style={styles.row}>
              <div style={{ width: "48%" }}>
                <label style={styles.label}>Mobile No.</label>
                <input
                  style={styles.inputHalf}
                  placeholder="Mobile No."
                  value={form.mobile}
                  onChange={handleChange("mobile")}
                />
                {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}
              </div>

              <div style={{ width: "48%" }}>
                <label style={styles.label}>Telephone No.</label>
                <input
                  style={styles.inputHalf}
                  placeholder="Telephone No."
                  value={form.telephone}
                  onChange={handleChange("telephone")}
                />
              </div>
            </div>

            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}

            <h3 style={styles.section}>PERSONAL INFORMATION</h3>

            <div style={styles.row}>
              <div style={{ width: "48%" }}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  style={styles.inputHalf}
                  placeholder="YYYY-MM-DD"
                  value={form.dob}
                  onChange={handleChange("dob")}
                />
                {errors.dob && <span style={styles.error}>{errors.dob}</span>}
              </div>

              <div style={{ width: "48%" }}>
                <label style={styles.label}>Marital Status</label>
                <select
                  style={styles.inputHalf}
                  value={form.maritalStatus}
                  onChange={handleChange("maritalStatus")}
                >
                  <option value="">Select status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
                {errors.maritalStatus && (
                  <span style={styles.error}>{errors.maritalStatus}</span>
                )}
              </div>
            </div>

            {showSpouse && (
              <>
                <label style={styles.label}>Spouse's Name</label>
                <input
                  style={styles.input}
                  placeholder="Spouse's Name"
                  value={form.spouseName}
                  onChange={handleChange("spouseName")}
                />

                <label style={styles.label}>Spouse's Occupation</label>
                <input
                  style={styles.input}
                  placeholder="Spouse's Occupation"
                  value={form.spouseOccupation}
                  onChange={handleChange("spouseOccupation")}
                />

                <div style={styles.row}>
                  <div style={{ width: "48%" }}>
                    <label style={styles.label}>Spouse's Date of Birth</label>
                    <input
                      style={styles.inputHalf}
                      placeholder="YYYY-MM-DD"
                      value={form.spouseDob}
                      onChange={handleChange("spouseDob")}
                    />
                  </div>

                  <div style={{ width: "48%" }}>
                    <label style={styles.label}>No. of Dependents</label>
                    <input
                      style={styles.inputHalf}
                      placeholder="No. of Dependents"
                      value={form.dependents}
                      onChange={handleChange("dependents")}
                    />
                  </div>
                </div>
              </>
            )}

            <h3 style={styles.section}>EDUCATION</h3>
            <label style={styles.label}>Educational Background</label>
            <textarea
              style={styles.textarea}
              placeholder="Educational background, schools attended, years completed, degrees earned"
              value={form.education}
              onChange={handleChange("education")}
            />
            {errors.education && <span style={styles.error}>{errors.education}</span>}

            <div style={styles.row}>
              <button
                style={styles.submitBtn}
                onClick={() => validatePage1() && setPage(2)}
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {/* PAGE 2 */}
        {page === 2 && (
          <>
            <h3 style={styles.section}>BUSINESS INTEREST</h3>

            <label style={styles.label}>Extent of involvement</label>
            <textarea
              style={styles.textarea}
              placeholder="Extent of your involvement in daily operations"
              value={form.involvement}
              onChange={handleChange("involvement")}
            />
            {errors.involvement && <span style={styles.error}>{errors.involvement}</span>}

            <label style={styles.label}>Percent of equity owned</label>
            <input
              style={styles.input}
              placeholder="Percent of equity owned"
              value={form.equity}
              onChange={handleChange("equity")}
            />
            {errors.equity && <span style={styles.error}>{errors.equity}</span>}

            <label style={styles.label}>Cash investment amount</label>
            <input
              style={styles.input}
              placeholder="Cash investment amount"
              value={form.investment}
              onChange={handleChange("investment")}
            />
            {errors.investment && <span style={styles.error}>{errors.investment}</span>}

            <label style={styles.label}>Source of funds</label>
            <input
              style={styles.input}
              placeholder="Source of funds"
              value={form.fundSource}
              onChange={handleChange("fundSource")}
            />
            {errors.fundSource && <span style={styles.error}>{errors.fundSource}</span>}

            <label style={styles.label}>Other business interests</label>
            <textarea
              style={styles.textarea}
              placeholder="Other business interests (if any)"
              value={form.otherBusiness}
              onChange={handleChange("otherBusiness")}
            />

            <label style={styles.label}>Preferred franchise location</label>
            <textarea
              style={styles.textarea}
              placeholder="Preferred franchise location"
              value={form.location}
              onChange={handleChange("location")}
            />
            {errors.location && <span style={styles.error}>{errors.location}</span>}

            <div style={styles.row}>
              <button style={styles.backBtn} onClick={() => setPage(1)}>
                BACK
              </button>
              <button
                style={styles.submitBtn}
                onClick={() => validatePage2() && setPage(3)}
              >
                NEXT
              </button>
            </div>
          </>
        )}

        {/* PAGE 3 */}
        {page === 3 && (
          <>
            <h3 style={styles.section}>DECLARATION</h3>

            <label style={styles.label}>Family dependence on franchise income</label>
            <textarea
              style={styles.textarea}
              placeholder="Will your family depend solely on franchise income?"
              value={form.familyDepend}
              onChange={handleChange("familyDepend")}
            />
            {errors.familyDepend && <span style={styles.error}>{errors.familyDepend}</span>}

            <label style={styles.label}>Immediate market area</label>
            <input
              style={styles.input}
              placeholder="Immediate market area"
              value={form.marketArea}
              onChange={handleChange("marketArea")}
            />
            {errors.marketArea && <span style={styles.error}>{errors.marketArea}</span>}

            <label style={styles.label}>Target start date</label>
            <input
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={form.startDate}
              onChange={handleChange("startDate")}
            />
            {errors.startDate && <span style={styles.error}>{errors.startDate}</span>}

            <div style={styles.row}>
              <div style={{ width: "48%" }}>
                <label style={styles.label}>Applicant Signature</label>
                <input
                  style={styles.inputHalf}
                  placeholder="Applicant Signature"
                  value={form.signature}
                  onChange={handleChange("signature")}
                />
                {errors.signature && <span style={styles.error}>{errors.signature}</span>}
              </div>

              <div style={{ width: "48%" }}>
                <label style={styles.label}>Date Signed</label>
                <input
                  style={{ ...styles.inputHalf, backgroundColor: "#f0f0f0" }}
                  value={form.dateSigned}
                  readOnly
                />
                {errors.dateSigned && <span style={styles.error}>{errors.dateSigned}</span>}
              </div>
            </div>

            <div style={styles.row}>
              <button style={styles.backBtn} onClick={() => setPage(2)}>
                BACK
              </button>
              <button
                style={styles.submitBtn}
                onClick={() => validatePage3() && alert("Application Submitted!")}
              >
                SUBMIT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: { padding: 20, display: "flex", justifyContent: "center", backgroundColor: "#fff3e0" },
  card: { width: "100%", maxWidth: 420, backgroundColor: "#fff", borderRadius: 20, padding: 18, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  label: { fontSize: 13, fontWeight: 600, marginBottom: 4, display: "block" },
  error: { color: "red", fontSize: 12, marginBottom: 8, display: "block" },
  logo: { width: 200, height: 70, display: "block", margin: "0 auto 10px" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  section: { fontSize: 17, fontWeight: "bold", margin: "12px 0" },
  row: { display: "flex", justifyContent: "space-between" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10 },
  inputHalf: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 10 },
  textarea: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12, minHeight: 80 },
  backBtn: { backgroundColor: "#9e9e9e", padding: 15, borderRadius: 10, width: "48%", border: "none", color: "#fff", cursor: "pointer" },
  submitBtn: { backgroundColor: "#ef6c00", padding: 15, borderRadius: 10, width: "48%", border: "none", color: "#fff", cursor: "pointer" },
};
