import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register ";

import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

function App() {

    const [page, setPage] = useState("login");
    const [user, setUser] = useState(null);

    if (!user) {

        if (page === "register") {
            return <Register setPage={setPage} />;
        }

        return (
            <Login
                setUser={setUser}
                setPage={setPage}
            />
        );
    }

    if (user.role === "admin") {
        return <AdminDashboard setUser={setUser} />;
    }

    if (user.role === "faculty") {
        return (
            <FacultyDashboard
                setUser={setUser}
                user={user}
            />
        );
    }

    if (user.role === "student") {
        return (
            <StudentDashboard
                setUser={setUser}
                user={user}
            />
        );
    }

    return null;
}

export default App;