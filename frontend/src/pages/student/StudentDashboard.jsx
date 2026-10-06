import { useState } from "react";
import StudentProfile from "./StudentProfile";

function StudentDashboard({ setUser, user }) {

    const [page, setPage] = useState("dashboard");

    const logout = () => {
        setUser(null);
    };

    return (
        <div>

            <h1>Student Dashboard</h1>

            <p>
                Welcome, {user.student.studentname}
            </p>

            <button
                onClick={() => setPage("dashboard")}
            >
                Dashboard
            </button>

            <button
                onClick={() => setPage("profile")}
            >
                My Profile
            </button>

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            {page === "dashboard" && (

                <div>

                    <h2>Welcome to StudentSphere</h2>

                    <p>
                        View your profile and academic details.
                    </p>

                    <h3>
                        CGPA: {user.student.studentcgpa}
                    </h3>

                    <h3>
                        Attendance:{" "}
                        {user.student.studentattendance}%
                    </h3>

                </div>
            )}

            {page === "profile" && (

                <StudentProfile
                    student={user.student}
                />

            )}

        </div>
    );
}

export default StudentDashboard;