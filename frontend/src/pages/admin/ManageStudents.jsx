import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageStudents() {

    const [students, setStudents] = useState([]);

    const [studentid, setStudentid] = useState("");
    const [studentname, setStudentname] = useState("");
    const [studentemail, setStudentemail] = useState("");
    const [studentphone, setStudentphone] = useState("");
    const [studentsemester, setStudentsemester] = useState("");
    const [studentdepartment, setStudentdepartment] = useState("");
    const [studentcgpa, setStudentcgpa] = useState("");
    const [studentattendance, setStudentattendance] = useState("");
    const [studentpassword, setStudentpassword] = useState("");

    const [editing, setEditing] = useState(false);

    const getStudents = async () => {
        try {
            const response = await api.get("/getstudent");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
            alert("Error fetching students!");
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const saveStudent = async (e) => {

        e.preventDefault();

        try {

            const studentData = {
                studentid: Number(studentid),
                studentname: studentname,
                studentemail: studentemail,
                studentphone: studentphone,
                studentsemester: Number(studentsemester),
                studentdepartment: studentdepartment,
                studentcgpa: Number(studentcgpa),
                studentattendance: Number(studentattendance),
                studentpassword: studentpassword
            };

            if (editing) {

                await api.put("/updatestudent", studentData);

                alert("Student Updated!");

            } else {

                await api.post("/addstudent", studentData);

                alert("Student Added!");
            }

            clearForm();
            getStudents();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error saving student!"
            );
        }
    };

    const editStudent = (student) => {

        setStudentid(student.studentid);
        setStudentname(student.studentname);
        setStudentemail(student.studentemail);
        setStudentphone(student.studentphone);
        setStudentsemester(student.studentsemester);
        setStudentdepartment(student.studentdepartment);
        setStudentcgpa(student.studentcgpa);
        setStudentattendance(student.studentattendance);

        setEditing(true);
    };

    const deleteStudent = async (id) => {

        try {

            const response = await api.delete(
                "/deletestudent",
                {
                    data: {
                        studentid: id
                    }
                }
            );

            alert(response.data.message);

            getStudents();

        } catch (error) {

            console.log(error);

            alert("Error deleting student!");
        }
    };

    const clearForm = () => {

        setStudentid("");
        setStudentname("");
        setStudentemail("");
        setStudentphone("");
        setStudentsemester("");
        setStudentdepartment("");
        setStudentcgpa("");
        setStudentattendance("");
        setStudentpassword("");

        setEditing(false);
    };

    return (

        <div>

            <h2>Manage Students</h2>

            <form onSubmit={saveStudent}>

                <input
                    type="number"
                    placeholder="Student ID"
                    value={studentid}
                    onChange={(e) => setStudentid(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentname}
                    onChange={(e) => setStudentname(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Student Email"
                    value={studentemail}
                    onChange={(e) => setStudentemail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Student Phone"
                    value={studentphone}
                    onChange={(e) => setStudentphone(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Semester"
                    value={studentsemester}
                    onChange={(e) => setStudentsemester(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Department"
                    value={studentdepartment}
                    onChange={(e) => setStudentdepartment(e.target.value)}
                    required
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="CGPA"
                    value={studentcgpa}
                    onChange={(e) => setStudentcgpa(e.target.value)}
                    required
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Overall Attendance"
                    value={studentattendance}
                    onChange={(e) => setStudentattendance(e.target.value)}
                    required
                />

                {!editing && (
                    <input
                        type="password"
                        placeholder="Student Password"
                        value={studentpassword}
                        onChange={(e) => setStudentpassword(e.target.value)}
                        required
                    />
                )}

                <button type="submit">
                    {editing ? "Update Student" : "Add Student"}
                </button>

                {editing && (
                    <button type="button" onClick={clearForm}>
                        Cancel
                    </button>
                )}

            </form>

            <h3>Student List</h3>

            <table border="1">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Semester</th>
                        <th>Department</th>
                        <th>CGPA</th>
                        <th>Attendance</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr key={student._id}>

                            <td>{student.studentid}</td>
                            <td>{student.studentname}</td>
                            <td>{student.studentemail}</td>
                            <td>{student.studentphone}</td>
                            <td>{student.studentsemester}</td>
                            <td>{student.studentdepartment}</td>
                            <td>{student.studentcgpa}</td>
                            <td>{student.studentattendance}%</td>

                            <td>

                                <button
                                    onClick={() => editStudent(student)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteStudent(student.studentid)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default ManageStudents;