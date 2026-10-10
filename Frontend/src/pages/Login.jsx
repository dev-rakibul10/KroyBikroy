import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const inputClass =
  "w-full border border-line bg-surface px-4 py-2.5 text-sm text-fg outline-none transition " +
  "placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary";

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
  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex w-full max-w-sm flex-col gap-4 border border-line bg-surface p-8 text-fg"
      >
        <div className="mb-2 text-center">
          <h1 className="prata-regular text-3xl">
            {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {isSignUp ? "Create an account to start shopping" : "Welcome back"}
          </p>
        </div>

        {isSignUp && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Name"
            autoComplete="name"
            required
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="Email"
          autoComplete="email"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} pr-16`}
            placeholder="Password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 text-xs text-muted hover:text-fg"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {isSignUp && (
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />
        )}

        <div className="flex justify-between text-sm text-muted">
          {isSignUp ? (
            <span />
          ) : (
            <button type="button" className="hover:text-fg">
              Forgot password?
            </button>
          )}
          <button type="button" onClick={switchMode} className="hover:text-fg">
            {isSignUp ? "Already have an account? Login" : "Create account"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary px-8 py-2.5 text-sm font-medium text-primary-fg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
