const inputClass =
  "w-full border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition " +
  "placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary";

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-muted";

const errorClass = "mt-1.5 text-xs text-red-500 dark:text-red-400";

const STRENGTH_LABELS = ["Too weak", "Weak", "Okay", "Good", "Strong"];
const STRENGTH_COLORS = [
  "bg-red-400",
  "bg-red-400",
  "bg-amber-400",
  "bg-green-500 dark:bg-green-400",
  "bg-green-600 dark:bg-green-500",
];

// 0-4: one point each for length, mixed case, a digit, a symbol
const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const EyeIcon = ({ off }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const PasswordStrength = ({ password }) => {
  const strength = getStrength(password);

  return (
    <div className="mt-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`h-1 flex-1 transition-colors duration-300 ${
              step <= strength ? STRENGTH_COLORS[strength] : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted">{STRENGTH_LABELS[strength]}</p>
    </div>
  );
};

// Everything except id/label/error is passed straight to the <input>
export const FormField = ({ id, label, error, ...inputProps }) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <input id={id} className={inputClass} {...inputProps} />
    {error && <p className={errorClass}>{error}</p>}
  </div>
);

export const PasswordField = ({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  autoComplete,
  showStrength = false,
}) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={`${inputClass} pr-12`}
        placeholder="Password"
        autoComplete={autoComplete}
        required
      />
      <button
        type="button"
        onClick={onToggleShow}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-3 cursor-pointer text-muted transition-colors hover:text-fg"
      >
        <EyeIcon off={show} />
      </button>
    </div>
    {showStrength && value && <PasswordStrength password={value} />}
  </div>
);
