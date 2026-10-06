import { useState } from "react";
import FacultyStudents from "./FacultyStudents";

function FacultyDashboard({ user, onLogout }) {

    const [page, setPage] = useState("dashboard");

    return (

        <div>

            <h1>Faculty Dashboard</h1>

            <button onClick={() => setPage("dashboard")}>
                Dashboard
            </button>

            <button onClick={() => setPage("students")}>
                Students
            </button>

            <button onClick={onLogout}>
                Logout
            </button>

            {page === "dashboard" && (

                <div>

                    <h2>Faculty Details</h2>

                    <p>
                        <strong>Faculty ID:</strong>{" "}
                        {user?.facultyid}
                    </p>

                    <p>
                        <strong>Name:</strong>{" "}
                        {user?.facultyname}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {user?.facultyemail}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {user?.facultyphone}
                    </p>

                    <p>
                        <strong>Designation:</strong>{" "}
                        {user?.facultydesignation}
                    </p>

                </div>
            )}

            {page === "students" && (
                <FacultyStudents />
            )}

        </div>
    );
}

export default FacultyDashboard;