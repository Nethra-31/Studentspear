import { useState } from "react";
import api from "../services/api";

function Login({ setUser, setPage }) {

    const [role, setRole] = useState("admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            let url = "";
            let data = {};

            if (role === "admin") {

                url = "/adminlogin";

                data = {
                    adminemail: email,
                    adminpassword: password
                };

            } else if (role === "faculty") {

                url = "/facultylogin";

                data = {
                    facultyemail: email,
                    facultypassword: password
                };

            } else {

                url = "/studentlogin";

                data = {
                    studentemail: email,
                    studentpassword: password
                };
            }

            const response = await api.post(url, data);

            if (response.data.success) {

                if (role === "student") {

                    setUser({
                        role: "student",
                        student: response.data.student
                    });

                } else if (role === "faculty") {

                    setUser({
                        role: "faculty",
                        ...response.data.faculty
                    });

                } else {

                    setUser({
                        role: "admin",
                        email: email
                    });
                }

                setMessage("");

            }

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Invalid Credentials!"
            );
        }
    };

    return (
        <div className="auth-container">

            <h1>StudentSphere</h1>

            <h2>Login</h2>

            <div className="role-buttons">

                <button onClick={() => setRole("admin")}>
                    Admin
                </button>

                <button onClick={() => setRole("faculty")}>
                    Faculty
                </button>

                <button onClick={() => setRole("student")}>
                    Student
                </button>

            </div>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>{message}</p>

            {role === "admin" && (
                <button onClick={() => setPage("register")}>
                    Create Admin Account
                </button>
            )}

        </div>
    );
}

export default Login;