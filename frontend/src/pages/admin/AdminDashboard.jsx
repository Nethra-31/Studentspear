import { useState } from "react";
import ManageFaculty from "./ManageFaculty";
import ManageStudents from "./ManageStudents";
import ManageCourses from "./ManageCourses";

function AdminDashboard({ setUser }) {

    const [page, setPage] = useState("dashboard");

    const logout = () => {
        setUser(null);
    };

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <button onClick={() => setPage("faculty")}>
                Manage Faculty
            </button>

            <button onClick={() => setPage("students")}>
                Manage Students
            </button>

            <button onClick={() => setPage("courses")}>
                Manage Courses
            </button>

            <button onClick={logout}>
                Logout
            </button>

            <hr />

            {page === "dashboard" && (
                <h2>Welcome Admin</h2>
            )}

            {page === "faculty" && (
                <ManageFaculty />
            )}

            {page === "students" && (
                <ManageStudents />
            )}

            {page === "courses" && (
                <ManageCourses />
            )}

        </div>
    );
}

export default AdminDashboard;