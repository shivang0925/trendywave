import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.userName === userName);
    if (userExists) {
      setMessage("User already exists. Please login.");
      return;
    }
    users.push({ userName, password });
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login.");
    setIsSignUp(false);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", userName);
      navigate("/cart"); // ✅ Redirect to Cart directly
    } else {
      setMessage("Invalid credentials!");
    }
  };

  const handleAuth = () => {
    if (isSignUp) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>{isSignUp ? "Signup" : "Login"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAuth} style={styles.button}>
          {isSignUp ? "Signup" : "Login"}
        </button>
        <p
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage("");
          }}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "New user? Signup here"}
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ece9e6, #ffffff)",
  },
  form: {
    width: "100%",
    maxWidth: "380px",
    backgroundColor: "#ffffff",
    padding: "20px 70px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 12px",
    margin: "12px 2px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#764abc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "12px",
  },
  toggleText: {
    cursor: "pointer",
    marginTop: "14px",
    color: "#764abc",
    fontWeight: "500",
  },
  message: {
    marginTop: "16px",
    color: "#dc3545", // red for error
    fontWeight: "500",
  },
};

export default Auth;
