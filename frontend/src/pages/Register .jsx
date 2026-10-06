import { useState } from "react";
import api from "../services/api";

function Register({ setPage }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/register", {
                username,
                email,
                password
            });

            setMessage(response.data.message);

            setUsername("");
            setEmail("");
            setPassword("");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Registration Failed!"
            );
        }
    };

    return (
        <div className="auth-container">

            <h1>StudentSphere</h1>
            <h2>Admin Registration</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Register
                </button>

            </form>

            <p>{message}</p>

            <button onClick={() => setPage("login")}>
                Back to Login
            </button>

        </div>
    );
}

export default Register;