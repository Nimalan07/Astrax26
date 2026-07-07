import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser, FaUniversity, FaBuilding, FaGraduationCap,
  FaUsers, FaCheckCircle, FaCloudUploadAlt, FaPhone, FaShieldAlt
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiBankCardFill } from "react-icons/ri";
import "../styles/Registration.css";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Particle Canvas (Phase 1)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Stars */
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      baseAlpha: Math.random() * 0.07 + 0.03,
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    /* Dust */
    const dust = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.12 - 0.04,
      r: Math.random() * 1.0 + 0.4,
      alpha: Math.random() * 0.06 + 0.02,
    }));

    /* Fog blobs */
    const fog = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 220 + 120,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      alpha: Math.random() * 0.025 + 0.008,
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Fog */
      fog.forEach(f => {
        f.x += f.vx; f.y += f.vy;
        if (f.x < -f.r)  f.x = canvas.width  + f.r;
        if (f.x > canvas.width  + f.r) f.x = -f.r;
        if (f.y < -f.r)  f.y = canvas.height + f.r;
        if (f.y > canvas.height + f.r) f.y = -f.r;
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        g.addColorStop(0,   `rgba(180,120,20,${f.alpha})`);
        g.addColorStop(0.5, `rgba(120,80,10,${f.alpha * 0.4})`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Stars */
      stars.forEach(s => {
        const alpha = s.baseAlpha + Math.sin(t * s.speed + s.phase) * (s.baseAlpha * 0.5);
        ctx.fillStyle = `rgba(255,220,140,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Dust */
      dust.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -4) { d.y = canvas.height + 4; d.x = Math.random() * canvas.width; }
        if (d.x < 0)  d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        ctx.fillStyle = `rgba(255,210,100,${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Cursor Gold Light (Phase 1)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CursorLight() {
  const lightRef = useRef(null);
  const pos = useRef({ x: -400, y: -400 });
  const cur = useRef({ x: -400, y: -400 });
  const animRef = useRef(null);

  const onMove = useCallback((e) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      cur.current.x = lerp(cur.current.x, pos.current.x, 0.07);
      cur.current.y = lerp(cur.current.y, pos.current.y, 0.07);
      if (lightRef.current) {
        lightRef.current.style.transform =
          `translate(${cur.current.x - 200}px, ${cur.current.y - 200}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [onMove]);

  return <div ref={lightRef} className="cursor-light" />;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Field Sub-components
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.38 } },
};

function Field({ label, icon, name, type, placeholder, formData, errors, onChange }) {
  return (
    <motion.div variants={fieldVariants} className={`field-wrap ${errors[name] ? "err" : ""}`}>
      <label className="field-label">{label}</label>
      <div className="field-input-row">
        <span className="field-icon">{icon}</span>
        <input
          type={type} name={name} value={formData[name]}
          onChange={onChange} placeholder={placeholder}
          className="field-input"
        />
      </div>
    </motion.div>
  );
}

function SelectField({ label, icon, name, formData, errors, onChange }) {
  return (
    <motion.div variants={fieldVariants} className={`field-wrap ${errors[name] ? "err" : ""}`}>
      <label className="field-label">{label}</label>
      <div className="field-input-row">
        <span className="field-icon">{icon}</span>
        <select name={name} value={formData[name]} onChange={onChange} className="field-input field-select">
          <option value="" disabled>Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Main Registration Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Registration() {
  const [step, setStep]                 = useState(1);
  const [isTransitioning, setTransit]   = useState(false);
  const [formData, setFormData]         = useState({
    name: "", email: "", mobile: "", college: "",
    department: "", year: "", teamName: "",
    transactionId: "", confirmPaid: false, screenshot: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
      if (errors.screenshot) setErrors({ ...errors, screenshot: false });
    }
  };

  const goToStep = (n) => {
    setTransit(true);
    setTimeout(() => {
      setStep(n);
      setTransit(false);
    }, 850);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const newErrors = {};
    ["name", "email", "mobile", "college", "department", "year"].forEach(
      (k) => { if (!formData[k].trim()) newErrors[k] = true; }
    );
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    goToStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.transactionId.trim()) newErrors.transactionId = true;
    if (!formData.screenshot)           newErrors.screenshot     = true;
    if (!formData.confirmPaid)          newErrors.confirmPaid    = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setTransit(true);
    try {
      const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      let base64Data = "";
      let mimeType = "";
      let fileName = "";

      if (formData.screenshot) {
        const reader = new FileReader();
        base64Data = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(formData.screenshot);
        });
        mimeType = formData.screenshot.type;
        fileName = formData.screenshot.name;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        teamName: formData.teamName,
        transactionId: formData.transactionId,
        screenshotBase64: base64Data,
        screenshotName: fileName,
        screenshotMime: mimeType
      };

      if (scriptURL) {
        const formParams = new URLSearchParams();
        for (const key in payload) {
          formParams.append(key, payload[key]);
        }

        await fetch(scriptURL, {
          method: "POST",
          body: formParams,
          mode: "no-cors"
        });
      } else {
        console.warn("VITE_GOOGLE_SCRIPT_URL is not defined. Skipping Google Sheets upload.");
      }

      setTimeout(() => {
        setStep(3);
        setTransit(false);
      }, 850);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
      setTransit(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.97, filter: "blur(6px)" },
    in:      { opacity: 1, scale: 1,    filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    out:     { opacity: 0, scale: 1.03, filter: "blur(5px)", transition: { duration: 0.3, ease: "easeIn"  } },
  };

  const gridVariants = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };

  return (
    <section className="reg-page">
      <ParticleCanvas />
      <CursorLight />
      <div className="reg-bg-glow" />
      <div className="mandala mandala-left" />
      <div className="mandala mandala-right" />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="portal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>

      <div className="reg-wrapper">
        {/* ── Progress Bar ── */}
        <div className="prog-bar">
          {[
            { n: 1, label: "DETAILS"       },
            { n: 2, label: "PAYMENT"       },
            { n: 3, label: "CONFIRMATION"  },
          ].map((s, i) => (
            <div key={s.n} className="prog-item">
              {i > 0 && (
                <div className={`prog-line ${step > i ? "done" : ""} ${step === i + 1 ? "current" : ""}`} />
              )}
              <div className="prog-step-col">
                <div className={`prog-circle ${step >= s.n ? "active" : ""} ${step > s.n ? "done" : ""} ${step === s.n ? "pulse" : ""}`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className={`prog-label ${step >= s.n ? "active" : ""}`}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Card + Glow container ── */}
        <div className="card-container">
          {/* 3 stacked glow layers that bleed out behind the card */}
          <div className="card-glow-wrapper" aria-hidden="true">
            <div className="glow-outer" />
            <div className="glow-core" />
            <div className="glow-hot" />
          </div>

          {/* Main Card */}
          <div className="reg-card">
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />

          <AnimatePresence mode="wait">

            {/* ══ STEP 1 ══ */}
            {step === 1 && (
              <motion.div key="s1" className="step-body"
                initial="initial" animate="in" exit="out" variants={pageVariants}
              >
                <div className="card-header">
                  <span className="fleur">⚜</span>
                  <p className="become-a">BECOME A</p>
                  <h1 className="legend">LEGEND</h1>
                  <span className="divider-diamond">◆</span>
                  <p className="card-subtitle">
                    Only those who complete the ritual<br />may enter Astra X.
                  </p>
                </div>

                <form className="reg-form">
                  <motion.div className="fields-grid" variants={gridVariants} initial="hidden" animate="show">
                    <Field label="FULL NAME"           icon={<FaUser />}         name="name"       type="text"  placeholder="Enter your full name"            formData={formData} errors={errors} onChange={handleChange} />
                    <Field label="EMAIL ADDRESS"       icon={<MdEmail />}        name="email"      type="email" placeholder="Enter your email address"         formData={formData} errors={errors} onChange={handleChange} />
                    <Field label="MOBILE NUMBER"       icon={<FaPhone />}        name="mobile"     type="tel"   placeholder="Enter mobile number"                 formData={formData} errors={errors} onChange={handleChange} />
                    <Field label="COLLEGE / UNIVERSITY" icon={<FaUniversity />}  name="college"    type="text"  placeholder="Enter college / university"       formData={formData} errors={errors} onChange={handleChange} />
                    <Field label="DEPARTMENT"          icon={<FaBuilding />}     name="department" type="text"  placeholder="Enter department"                formData={formData} errors={errors} onChange={handleChange} />
                    <SelectField label="YEAR OF STUDY" icon={<FaGraduationCap />} name="year"      formData={formData} errors={errors} onChange={handleChange} />
                    <motion.div variants={fieldVariants} className="span-2">
                      <Field label="(OPTIONAL) TEAM NAME" icon={<FaUsers />}   name="teamName"   type="text"  placeholder="Enter team name (optional)"      formData={formData} errors={errors} onChange={handleChange} />
                    </motion.div>
                  </motion.div>

                  <CTA onClick={handleNextStep} loading={isTransitioning}>
                    CONTINUE TO PAYMENT &nbsp;›
                  </CTA>

                  <p className="secure-note">
                    <FaShieldAlt className="shield-icon-gold" />
                    Secure Registration
                  </p>
                </form>
              </motion.div>
            )}

            {/* ══ STEP 2 ══ */}
            {step === 2 && (
              <motion.div key="s2" className="step-body"
                initial="initial" animate="in" exit="out" variants={pageVariants}
              >
                <div className="card-header">
                  <span className="fleur">⚜</span>
                  <p className="become-a">SECURE YOUR</p>
                  <h1 className="legend">ALL ACCESS</h1>
                  <span className="divider-diamond">◆</span>
                </div>

                <div className="payment-grid">
                  <div className="ticket-panel">
                    <div className="ticket-price">₹250</div>
                    <div className="ticket-subtitle">Registration Fee</div>
                    <ul className="inclusions">
                      <li><span className="check">✓</span> Access to all 6 Events</li>
                      <li><span className="check">✓</span> Workshops</li>
                      <li><span className="check">✓</span> Participation Certificate</li>
                      <li><span className="check">✓</span> Event Updates</li>
                    </ul>
                  </div>

                  {/* QR — center column (direct grid child) */}
                  <div className="qr-panel">
                    <p className="qr-label">Scan & Pay</p>
                    <div className="qr-wrap">
                      <div className="qr-ring" />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                        alt="GPay QR" className="qr-img"
                      />
                    </div>
                  </div>

                  {/* Form — right column (direct grid child) */}
                  <form className="payment-form-col" onSubmit={handleSubmit}>
                    <motion.div variants={gridVariants} initial="hidden" animate="show"
                      style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <Field label="UPI TRANSACTION ID" icon={<RiBankCardFill />} name="transactionId" type="text" placeholder="Enter 12-digit transaction ID" formData={formData} errors={errors} onChange={handleChange} />

                      <motion.div variants={fieldVariants} className={`field-wrap ${errors.screenshot ? "err" : ""}`}>
                        <label className="field-label">UPLOAD PAYMENT SCREENSHOT</label>
                        <div className="file-upload-wrapper">
                          <input type="file" id="screenshot" accept="image/*" onChange={handleFileChange} />
                          <label htmlFor="screenshot" className="file-btn">
                            <FaCloudUploadAlt />
                            {formData.screenshot ? formData.screenshot.name : "Choose Image"}
                          </label>
                        </div>
                      </motion.div>

                      <motion.div variants={fieldVariants} className={`check-row ${errors.confirmPaid ? "err" : ""}`}>
                        <input type="checkbox" id="confirmPaid" name="confirmPaid" checked={formData.confirmPaid} onChange={handleChange} />
                        <label htmlFor="confirmPaid">I confirm that I have paid ₹250 using the official QR code.</label>
                      </motion.div>
                    </motion.div>

                    <div className="step2-actions">
                      <button type="button" className="back-btn" onClick={() => setStep(1)}>← Back</button>
                      <CTA type="submit" loading={isTransitioning} className="grow">
                        COMPLETE REGISTRATION &nbsp;›
                      </CTA>
                    </div>
                  </form>
                </div>{/* end payment-grid */}
              </motion.div>
            )}

            {/* ══ STEP 3 ══ */}
            {step === 3 && (
              <motion.div key="s3" className="step-body success-body"
                initial="initial" animate="in" exit="out" variants={pageVariants}
              >
                <div className="success-glow-wrap">
                  <FaCheckCircle className="success-icon" />
                  <div className="success-halo" />
                </div>
                <span className="fleur">⚜</span>
                <p className="become-a">WELCOME TO</p>
                <h1 className="legend">ASTRA X</h1>
                <span className="divider-diamond">◆</span>
                <p className="card-subtitle">Your registration request has been received.</p>

                <div className="status-pill">
                  <span className="status-dot" />
                  Verification Pending
                </div>

                <p className="success-footer">
                  You'll receive confirmation once your payment has been verified.<br />
                  See you at Astra X 2026.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>{/* end reg-card */}
        </div>{/* end card-container */}
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CTA Button with loading state
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CTA({ children, onClick, loading, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`cta-btn ${className}`}
    >
      <span className="cta-shine" />
      {loading ? <span className="cta-spinner">⟳</span> : children}
    </button>
  );
}

export default Registration;
