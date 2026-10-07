import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      {currentState === "Sign Up" ? (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Confirm Password"
          required
        />
      ) : (
        ""
      )}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Sign Up" ? (
          ""
        ) : (
          <p className="cursor-pointer">Forgot password?</p>
        )}
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Account
          </p>
        )}
      </div>
      <button
        onSubmit={onSubmitHandler}
        className="bg-black text-white px-8 py-2 mt-4 cursor-pointer"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
