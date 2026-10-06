import { useEffect, useState } from "react";
import api from "../../services/api";

function FacultyStudents() {

    const [students, setStudents] = useState([]);

    const getStudents = async () => {

        try {

            const response = await api.get("/getstudent");

            setStudents(response.data);

        } catch (error) {

            alert("Error fetching students!");
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const updateAcademic = async (
        studentid,
        studentcgpa,
        studentattendance
    ) => {

        try {

            await api.put("/updateacademic", {

                studentid: studentid,

                studentcgpa: Number(studentcgpa),

                studentattendance:
                    Number(studentattendance)

            });

            alert("Academic Details Updated!");

            getStudents();

        } catch (error) {

            alert("Update Failed!");
        }
    };

    return (
        <div>

            <h2>Student Details</h2>

            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Semester</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Attendance</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <StudentRow
                            key={student._id}
                            student={student}
                            updateAcademic={updateAcademic}
                        />

                    ))}

                </tbody>

            </table>

        </div>
    );
}

function StudentRow({ student, updateAcademic }) {

    const [cgpa, setCgpa] = useState(student.studentcgpa);

    const [attendance, setAttendance] =
        useState(student.studentattendance);

    return (

        <tr>

            <td>{student.studentid}</td>

            <td>{student.studentname}</td>

            <td>{student.studentemail}</td>

            <td>{student.studentsemester}</td>

            <td>{student.studentdepartment}</td>

            <td>

                <input
                    type="number"
                    step="0.01"
                    value={cgpa}
                    onChange={(e) =>
                        setCgpa(e.target.value)
                    }
                />

            </td>

            <td>

                <input
                    type="number"
                    value={attendance}
                    onChange={(e) =>
                        setAttendance(e.target.value)
                    }
                />

            </td>

            <td>

                <button
                    onClick={() =>
                        updateAcademic(
                            student.studentid,
                            cgpa,
                            attendance
                        )
                    }
                >
                    Update
                </button>

            </td>

        </tr>
    );
}

export default FacultyStudents;