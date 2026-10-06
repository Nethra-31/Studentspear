import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageCourses() {

    const [courses, setCourses] = useState([]);

    const [courseid, setCourseid] = useState("");
    const [coursename, setCoursename] = useState("");

    const [editing, setEditing] = useState(false);

    const getCourses = async () => {

        try {

            const response = await api.get("/getcourse");

            setCourses(response.data);

        } catch (error) {

            console.log(error);
            alert("Error fetching courses!");
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const saveCourse = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await api.put("/updatecourse", {
                    courseid: Number(courseid),
                    coursename: coursename
                });

                alert("Course Updated!");

            } else {

                await api.post("/addcourse", {
                    courseid: Number(courseid),
                    coursename: coursename
                });

                alert("Course Added!");
            }

            clearForm();
            getCourses();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error saving course!"
            );
        }
    };

    const editCourse = (course) => {

        setCourseid(course.courseid);
        setCoursename(course.coursename);

        setEditing(true);
    };

    const deleteCourse = async (id) => {

        try {

            const response = await api.delete(
                "/deletecourse",
                {
                    data: {
                        courseid: id
                    }
                }
            );

            alert(response.data.message);

            getCourses();

        } catch (error) {

            console.log(error);
            alert("Error deleting course!");
        }
    };

    const clearForm = () => {

        setCourseid("");
        setCoursename("");

        setEditing(false);
    };

    return (
        <div>

            <h2>Manage Courses</h2>

            <form onSubmit={saveCourse}>

                <input
                    type="number"
                    placeholder="Course ID"
                    value={courseid}
                    onChange={(e) =>
                        setCourseid(e.target.value)
                    }
                    required
                    disabled={editing}
                />

                <input
                    type="text"
                    placeholder="Course Name"
                    value={coursename}
                    onChange={(e) =>
                        setCoursename(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    {editing ? "Update Course" : "Add Course"}
                </button>

                {editing && (
                    <button
                        type="button"
                        onClick={clearForm}
                    >
                        Cancel
                    </button>
                )}

            </form>

            <h3>Course List</h3>

            <table border="1">

                <thead>

                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {courses.map((course) => (

                        <tr key={course._id}>

                            <td>{course.courseid}</td>
                            <td>{course.coursename}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        editCourse(course)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteCourse(
                                            course.courseid
                                        )
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

export default ManageCourses;