function StudentProfile({ student }) {

    return (
        <div>

            <h2>My Profile</h2>

            <p>
                <strong>Student ID:</strong>
                {" "}{student.studentid}
            </p>

            <p>
                <strong>Name:</strong>
                {" "}{student.studentname}
            </p>

            <p>
                <strong>Email:</strong>
                {" "}{student.studentemail}
            </p>

            <p>
                <strong>Phone:</strong>
                {" "}{student.studentphone}
            </p>

            <p>
                <strong>Semester:</strong>
                {" "}{student.studentsemester}
            </p>

            <p>
                <strong>Department:</strong>
                {" "}{student.studentdepartment}
            </p>

            <hr />

            <h3>Academic Details</h3>

            <p>
                <strong>CGPA:</strong>
                {" "}{student.studentcgpa}
            </p>

            <p>
                <strong>Overall Attendance:</strong>
                {" "}{student.studentattendance}%
            </p>

        </div>
    );
}

export default StudentProfile;