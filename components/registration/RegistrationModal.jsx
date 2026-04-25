"use client";

import { useRegistration } from "./RegistrationProvider";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { API_URL, IMAGE_URL, SIGNUP_PROFILE_UPLOAD_URL } from "@/lib/constants";

// ─── Blood group options ───────────────────────────────────────────────────────

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CameraIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function EyeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function SpinnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function GooglePlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.3.17.64.24.99.19l12.6-7.28-2.7-2.7L3.18 23.76zM.5 1.08C.19 1.41 0 1.93 0 2.61v18.78c0 .68.19 1.2.5 1.53l.08.07 10.52-10.52v-.25L.58 1.01.5 1.08zM20.32 10.53l-2.99-1.73-3.03 3.03 3.03 3.03 3-1.73c.86-.5.86-1.1 0-1.6zM4.17.24l12.6 7.28-2.7 2.7L4.17.24z" />
    </svg>
  );
}

function AppleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ─── Input components ─────────────────────────────────────────────────────────

const inputClass =
  "bg-primary-dark-800 border border-primary-dark-700 rounded-xl px-4 py-3 text-primary-bright-100 w-full focus:outline-none focus:border-primary-dark-600 placeholder:text-primary-bright-300";

const labelClass = "text-sm text-primary-bright-200 mb-1.5";

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-primary-dark-700" />
      <span className="text-xs uppercase tracking-widest text-red-500 font-semibold whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-primary-dark-700" />
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ gymName, androidUrl, iosUrl, closeModal }) {
  const router = useRouter();

  const handleBack = () => {
    closeModal();
    router.push("/");
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 py-10 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40"
      >
        <CheckCircleIcon className="size-10 text-green-400" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-teko text-3xl text-primary-bright-100">Registration Successful!</h2>
        <p className="text-primary-bright-200 text-base">Welcome to {gymName}!</p>
        <p className="text-primary-bright-300 text-sm">
          Download our app to manage your membership.
        </p>
      </div>

      {(androidUrl || iosUrl) && (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {androidUrl && (
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-primary-dark-800 border border-primary-dark-700 text-primary-bright-100 hover:border-primary-dark-600 transition-colors duration-200"
            >
              <GooglePlayIcon className="size-5 text-green-400" />
              <span className="text-sm font-medium">Get it on Google Play</span>
            </a>
          )}
          {iosUrl && (
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-primary-dark-800 border border-primary-dark-700 text-primary-bright-100 hover:border-primary-dark-600 transition-colors duration-200"
            >
              <AppleIcon className="size-5 text-primary-bright-100" />
              <span className="text-sm font-medium">Download on the App Store</span>
            </a>
          )}
        </div>
      )}

      {/* <button
        onClick={handleBack}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-primary-dark-700 text-primary-bright-200 hover:border-primary-dark-600 hover:text-primary-bright-100 transition-colors duration-200 text-sm"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </button> */}
    </motion.div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function RegistrationModal() {
  const { isOpen, closeModal, gymData, termsContent } = useRegistration();

  const gymId = gymData?._id ?? "";
  const gymName = gymData?.gymName ?? "the Gym";
  const logo = gymData?.logo ?? "";
  const androidUrl = gymData?.androidUrl ?? "";
  const iosUrl = gymData?.iosUrl ?? "";

  // ── form state ──
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profileUploading, setProfileUploading] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [nidNumber, setNidNumber] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const termsRef = useRef(null);
  const fileInputRef = useRef(null);

  // ── scroll lock ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── ESC key ──
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  // ── reset form when closed ──
  useEffect(() => {
    if (!isOpen) {
      // small delay so exit animation plays first
      const t = setTimeout(() => {
        setProfilePictureUrl("");
        setProfileError("");
        setFullName("");
        setPhone("");
        setPassword("");
        setShowPassword(false);
        setGender("");
        setAge(""); setHeight(""); setWeight("");
        setBirthDate(""); setBloodGroup("");
        setAddress(""); setNidNumber("");
        setAgreedToTerms(false);
        setShowTerms(false);
        setFieldErrors({});
        setSubmitError("");
        setLoading(false);
        setSuccess(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── profile picture upload ──
  const handleProfileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileUploading(true);
    setProfileError("");
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(SIGNUP_PROFILE_UPLOAD_URL, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProfilePictureUrl(data.url ?? "");
    } catch {
      setProfileError("Image upload failed. Please try again.");
    } finally {
      setProfileUploading(false);
    }
  };

  // ── terms scroll ──
  const handleTermsClick = () => {
    setShowTerms(true);
    setTimeout(() => {
      termsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // ── validation ──
  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!phone.trim()) errs.phone = "Phone number is required.";
    if (!password.trim()) errs.password = "Password is required.";
    if (!gender) errs.gender = "Please select a gender.";
    if (!agreedToTerms) errs.agreedToTerms = "Please agree to the terms and conditions.";
    return errs;
  };

  // ── submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    setLoading(true);
    try {
      const body = {
        fullName: fullName.trim(),
        phone: `+88${phone.trim()}`,
        password,
        profilePicture: profilePictureUrl,
        gender,
        gym: gymId,
        ...(age ? { age: Number(age) } : {}),
        ...(height ? { height: Number(height) } : {}),
        ...(weight ? { weight: Number(weight) } : {}),
        ...(birthDate ? { birthDate } : {}),
        ...(bloodGroup ? { bloodGroup } : {}),
        ...(address.trim() ? { address: address.trim() } : {}),
        ...(nidNumber ? { nidNumber } : {}),
      };

      const res = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
            onClick={closeModal}
          >
            {/* Panel — stop propagation so clicking inside doesn't close */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-lg overflow-y-auto bg-primary-dark-900 sm:rounded-2xl border border-primary-dark-700"
            >
              {/* ── Sticky header ── */}
              <div className="sticky top-0 z-10 bg-primary-dark-900 border-b border-primary-dark-700 px-5 py-4 flex items-center gap-3">
                {logo && (
                  <div className="relative h-9 w-9 flex-none overflow-hidden rounded-lg">
                    <Image
                      src={`${IMAGE_URL}/${logo}`}
                      alt={gymName}
                      fill
                      sizes="36px"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                )}
                <h2 className="font-teko text-xl text-primary-bright-100 leading-none flex-1">
                  Register in {gymName}
                </h2>
                <button
                  onClick={closeModal}
                  className="flex-none text-primary-bright-300 hover:text-primary-bright-100 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              {/* ── Body ── */}
              <div className="px-5 pb-8 pt-6">
                <AnimatePresence mode="wait">
                  {success ? (
                    <SuccessScreen
                      key="success"
                      gymName={gymName}
                      androidUrl={androidUrl}
                      iosUrl={iosUrl}
                      closeModal={closeModal}
                    />
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      noValidate
                    >
                      {/* ── Profile picture ── */}
                      <div className="flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="relative w-20 h-20 rounded-full overflow-hidden bg-primary-dark-800 border-2 border-primary-dark-700 hover:border-primary-dark-600 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:border-red-600"
                          aria-label="Upload profile picture"
                        >
                          {profileUploading ? (
                            <SpinnerIcon className="size-6 text-primary-bright-200 animate-spin" />
                          ) : profilePictureUrl ? (
                            <Image
                              src={`${IMAGE_URL}/${profilePictureUrl}`}
                              alt="Profile preview"
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <CameraIcon className="size-7 text-primary-bright-300" />
                          )}
                        </button>
                        <p className="text-xs text-primary-bright-300">Tap to upload photo</p>
                        {profileError && (
                          <p className="text-xs text-red-500">{profileError}</p>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfileChange}
                        />
                      </div>

                      {/* ── Full Name ── */}
                      <Field label="Full Name" required error={fieldErrors.fullName}>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={inputClass}
                        />
                      </Field>

                      {/* ── Phone ── */}
                      <Field label="Phone Number" required error={fieldErrors.phone}>
                        <input
                          type="text"
                          placeholder="Enter your mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputClass}
                        />
                        <p className="mt-1 text-xs text-primary-bright-300">
                          Mobile number used to login in the app
                        </p>
                      </Field>

                      {/* ── Password ── */}
                      <Field label="Password" required error={fieldErrors.password}>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClass} pr-11`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-bright-300 hover:text-primary-bright-100 transition-colors duration-200"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="size-5" />
                            ) : (
                              <EyeIcon className="size-5" />
                            )}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-primary-bright-300">
                          Phone number and password required to login
                        </p>
                      </Field>

                      {/* ── Gender ── */}
                      <Field label="Gender" required error={fieldErrors.gender}>
                        <div className="flex gap-2">
                          {["MALE", "FEMALE", "OTHER"].map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setGender(g)}
                              className={`flex-1 py-2.5 rounded-full text-sm font-medium border transition-colors duration-200
                                ${gender === g
                                  ? "bg-red-600 border-red-900 text-white"
                                  : "bg-primary-dark-800 border-primary-dark-700 text-primary-bright-200 hover:border-primary-dark-600"
                                }`}
                            >
                              {g.charAt(0) + g.slice(1).toLowerCase()}
                            </button>
                          ))}
                        </div>
                      </Field>

                      {/* ── Optional info divider ── */}
                      <SectionDivider label="Optional Information" />

                      {/* ── Age / Height / Weight ── */}
                      <div className="grid grid-cols-3 gap-3">
                        <Field label="Age">
                          <input
                            type="number"
                            placeholder="yrs"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className={inputClass}
                            min={1}
                          />
                        </Field>
                        <Field label="Height (cm)">
                          <input
                            type="number"
                            placeholder="cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className={inputClass}
                            min={1}
                          />
                        </Field>
                        <Field label="Weight (kg)">
                          <input
                            type="number"
                            placeholder="kg"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className={inputClass}
                            min={1}
                          />
                        </Field>
                      </div>

                      {/* ── Date of Birth / Blood Group ── */}
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Date of Birth">
                          <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Blood Group">
                          <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className={`${inputClass} appearance-none`}
                          >
                            <option value="">Select</option>
                            {BLOOD_GROUPS.map((bg) => (
                              <option key={bg} value={bg}>{bg}</option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      {/* ── Address ── */}
                      <Field label="Address">
                        <textarea
                          rows={2}
                          placeholder="Enter your address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`${inputClass} resize-none`}
                        />
                      </Field>

                      {/* ── NID Number ── */}
                      <Field label="NID Number">
                        <input
                          type="number"
                          placeholder="Enter NID number"
                          value={nidNumber}
                          onChange={(e) => setNidNumber(e.target.value)}
                          className={inputClass}
                        />
                      </Field>

                      {/* ── Terms checkbox ── */}
                      <Field  error={fieldErrors.agreedToTerms}>
                        <div className="flex items-start gap-3">
                        <input
                          id="terms-checkbox"
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-0.5 flex-none w-4 h-4 accent-red-600 cursor-pointer"
                        />
                        <label htmlFor="terms-checkbox" className="text-sm text-primary-bright-200 cursor-pointer select-none">
                          I agree to the{" "}
                          {termsContent && (
                            <button
                              type="button"
                              onClick={handleTermsClick}
                              className="text-red-500 hover:text-red-400 underline transition-colors duration-200"
                            >
                              Terms and Conditions
                            </button>
                          )}
                          {!termsContent && (
                            <span className="text-red-500">Terms and Conditions</span>
                          )}
                        </label>
                        </div>
                      </Field>

                      {/* ── Error message ── */}
                      {submitError && (
                        <p className="text-sm text-red-500 text-center px-2">{submitError}</p>
                      )}

                      {/* ── Submit button ── */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-red-600 text-white font-medium border border-red-900 hover:bg-red-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading && <SpinnerIcon className="size-5 animate-spin" />}
                        {loading ? "Registering..." : "Register Now"}
                      </button>

                      {/* ── T&C content block ── */}
                      {termsContent && showTerms && (
                        <div ref={termsRef} className="mt-2">
                          <SectionDivider label="Terms and Conditions" />
                          <div
                            dangerouslySetInnerHTML={{ __html: termsContent }}
                            className="prose prose-invert text-sm mt-4 max-w-none"
                          />
                        </div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
