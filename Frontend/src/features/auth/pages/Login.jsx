import { useState } from "react";
import { Link, useNavigate } from "react-router";
import fashionModel from "../../../assets/fashion_model.png";
import { useAuth } from "../hook/useAuth";

/* ─── Eye Toggle Icons ────────────────────────────────────── */
const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} width={14} height={14}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);
const EyeOn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} width={14} height={14}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

/* ─── Single Field ─────────────────────────────────────────── */
function Field({ label, id, type = "text", placeholder, value, onChange, showToggle, showState, onToggle }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`text-[9px] font-bold tracking-[0.16em] uppercase select-none transition-colors duration-300 ${focused ? "text-[#F5C518]" : "text-white/60"}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showToggle ? (showState ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent outline-none border-b text-[13px] font-normal text-white transition-colors duration-300 placeholder:text-white/25
            ${focused ? "border-[#F5C518]" : "border-white/15"}
            ${showToggle ? "py-[9px] pr-6 pl-0" : "py-[9px] px-0"}
          `}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none p-0 cursor-pointer text-white/50 hover:text-white transition-colors duration-200 leading-none"
          >
            {showState ? <EyeOn /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function Login() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (id) => (e) => setForm((p) => ({ ...p, [id]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await handleLogin({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
      `}</style>

      <div className="relative w-screen h-screen overflow-hidden flex flex-col md:flex-row items-center justify-between bg-black font-['Inter'] antialiased overflow-y-auto md:overflow-y-hidden">

        {/* ── Background ── */}
        <img
          src={fashionModel}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[40%_15%] z-0 brightness-[0.88] contrast-[1.05] saturate-[0.8]"
        />

        {/* Global Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/40 via-black/60 to-black/90" />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        {/* ── Left Brand Content ── */}
        <div className="relative z-10 w-full md:flex-1 h-auto md:h-full p-8 md:p-16 flex flex-col justify-center md:justify-between text-center md:text-left pointer-events-none min-h-[40vh] md:min-h-0">

          <div className="flex items-center justify-center md:justify-start gap-3 mb-10 md:mb-0">
            <div className="text-white font-black text-base tracking-tight">SNITCH</div>
            <div className="w-8 h-[1.5px] bg-[#F5C518]" />
            <div className="text-white/70 font-bold text-[9px] tracking-[0.3em] uppercase">Studio Collection</div>
          </div>

          <div className="relative">
            <div
              className="absolute left-1/2 md:-left-[2%] bottom-0 md:-bottom-[15%] -translate-x-1/2 md:translate-x-0 text-[clamp(120px,15vw,220px)] font-black text-transparent leading-[0.8] -z-10 tracking-tighter select-none"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
            >
              WELCOME
            </div>
            <h2 className="text-[clamp(40px,6vw,72px)] font-extrabold text-white leading-[1.05] tracking-tight mb-4">
              Good to have<br />
              <span className="text-[#F5C518]">you back.</span>
            </h2>
            <p className="text-[13px] text-white/70 font-normal leading-relaxed max-w-[320px] tracking-wide mx-auto md:mx-0">
              Sign in to access your exclusive Snitch wardrobe. Premium streetwear awaits.
            </p>
          </div>
        </div>

        {/* ── Right Glass Panel ── */}
        <div className="relative z-10 w-full md:w-auto h-auto md:h-full p-6 md:py-10 md:pr-20 md:pl-10 flex items-start md:items-center justify-center md:justify-end pb-16 md:pb-10">

          <div className="w-full max-w-[400px] bg-[#0c0c0c]/45 backdrop-blur-2xl border border-white/10 p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-3xl">

            {/* Header */}
            <div className="mb-9">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-1.5 bg-[#F5C518] rounded-full" />
                <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">Sign In</h1>
              </div>
              <p className="text-xs text-white/50 font-normal ml-[18px]">
                New to Snitch?{" "}
                <Link
                  to="/register"
                  className="text-white no-underline border-b border-white/30 pb-[1px] hover:text-[#F5C518] hover:border-[#F5C518] transition-colors duration-200"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit}>
              <div className="flex flex-col gap-6 mb-5">
                <Field
                  label="Email Address"
                  id="login-email"
                  type="email"
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={set("email")}
                />
                <Field
                  label="Password"
                  id="login-password"
                  placeholder="Your password"
                  value={form.password}
                  onChange={set("password")}
                  showToggle
                  showState={showPw}
                  onToggle={() => setShowPw((v) => !v)}
                />
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end mb-1">
                <Link
                  to="/forgot-password"
                  className="text-[10px] text-white/40 hover:text-[#F5C518] transition-colors duration-200 no-underline tracking-wide"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 font-medium tracking-wide">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-6 bg-[#F5C518] border-none text-[11px] font-extrabold tracking-[0.2em] uppercase text-black cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)] active:scale-95 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
