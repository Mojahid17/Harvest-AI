import { useState } from "react";
import API from "../services/api";


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {

    try {

      const response = await API.post("/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      setMessage("Login Successful");

      window.location.href = "/admin";

    } catch {

      setMessage("Invalid Credentials");

    }
  };

  return (

    <div className="min-h-screen bg-[#07140d] flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-[400px]">

        <h1 className="text-4xl text-white font-bold mb-8">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl"
        />

        <div className="relative mb-4">
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl pr-12"
        />
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        >
            {showPassword ? "🙈" : "👁"}
        </button>

    </div> 

        <button
          onClick={handleLogin}
          className="bg-green-500 px-6 py-3 rounded-xl w-full"
        >
          Login
        </button>

        <p className="text-green-300 mt-4">
          {message}
        </p>

      </div>

    </div>
  );
}

export default Login;