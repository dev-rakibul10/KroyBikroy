import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import AuthImagePanel from "../components/login/AuthImagePanel";
import { FormField, PasswordField } from "../components/login/AuthFields";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, token, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSignUp = currentState === "Sign Up";
  const mismatch = isSignUp && confirmPassword && password !== confirmPassword;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const url =
        backendUrl + (isSignUp ? "/api/user/register" : "/api/user/login");
      const payload = isSignUp
        ? { name, email, password }
        : { email, password };
      const { data } = await axios.post(url, payload);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(isSignUp ? "Account created" : "Welcome back");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setCurrentState(isSignUp ? "Login" : "Sign Up");
    setConfirmPassword("");
  };

  // the toggle only switches when the OTHER tab is clicked
  const goTo = (mode) => {
    if (mode !== currentState) switchMode();
  };

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  return (
    <div className="mx-auto my-8 grid w-full max-w-5xl overflow-hidden border border-line bg-surface text-fg sm:my-12 lg:min-h-[34rem] lg:grid-cols-2">
      <AuthImagePanel />

      <div className="flex items-center justify-center px-6 py-10 sm:px-12">
        <form
          onSubmit={onSubmitHandler}
          className="flex w-full max-w-sm flex-col gap-5"
        >
          <div>
            <div className="flex items-center gap-3 text-muted">
              <p className="h-0.5 w-8 bg-current"></p>
              <p className="text-xs tracking-[0.3em]">MY ACCOUNT</p>
            </div>
            <h1 className="prata-regular mt-3 text-4xl">
              {isSignUp ? "Sign Up" : "Login"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {isSignUp
                ? "Create an account to start shopping"
                : "Welcome back"}
            </p>
          </div>

          {/* Segmented toggle */}
          <div className="grid grid-cols-2 border border-line p-1 text-sm">
            {["Login", "Sign Up"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => goTo(mode)}
                className={`cursor-pointer py-2 transition-colors duration-300 ${
                  currentState === mode
                    ? "bg-primary text-primary-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* key={currentState}: new mode = fresh wrapper, so the entrance animation replays */}
          <div key={currentState} className="page-in flex flex-col gap-5">
            {isSignUp && (
              <FormField
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            )}

            <FormField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <PasswordField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              show={showPassword}
              onToggleShow={() => setShowPassword((prev) => !prev)}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              showStrength={isSignUp}
            />

            {isSignUp && (
              <FormField
                id="confirm"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                autoComplete="new-password"
                error={mismatch ? "Passwords don't match" : ""}
                required
              />
            )}

            {!isSignUp && (
              <button
                type="button"
                className="-mt-2 cursor-pointer self-end text-sm text-muted transition-colors hover:text-fg"
              >
                Forgot password?
              </button>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex cursor-pointer items-center justify-center gap-3 bg-primary px-8 py-3.5 text-sm font-medium tracking-[0.2em] text-primary-fg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                PLEASE WAIT
              </>
            ) : (
              <>
                {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>

          <p className="text-center text-sm text-muted">
            {isSignUp ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="cursor-pointer text-fg underline underline-offset-4"
            >
              {isSignUp ? "Login" : "Create account"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
