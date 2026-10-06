import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageFaculty() {

    const [faculties, setFaculties] = useState([]);

    const [facultyid, setFacultyid] = useState("");
    const [facultyname, setFacultyname] = useState("");
    const [facultyemail, setFacultyemail] = useState("");
    const [facultyphone, setFacultyphone] = useState("");
    const [facultydesignation, setFacultydesignation] = useState("");
    const [facultypassword, setFacultypassword] = useState("");

    const [editing, setEditing] = useState(false);

    const getFaculty = async () => {

        try {

            const response = await api.get("/getfaculty");

            setFaculties(response.data);

        } catch (error) {

            console.log(error);
            alert("Error fetching faculty!");
        }
    };

    useEffect(() => {
        getFaculty();
    }, []);

    const saveFaculty = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await api.put("/updatefaculty", {
                    facultyid: Number(facultyid),
                    facultyname,
                    facultyemail,
                    facultyphone,
                    facultydesignation
                });

                alert("Faculty Updated!");

            } else {

                await api.post("/addfaculty", {
                    facultyid: Number(facultyid),
                    facultyname,
                    facultyemail,
                    facultyphone,
                    facultydesignation,
                    facultypassword
                });

                alert("Faculty Added!");
            }

            clearForm();
            getFaculty();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error saving faculty!"
            );
        }
    };

    const editFaculty = (faculty) => {

        setFacultyid(faculty.facultyid);
        setFacultyname(faculty.facultyname);
        setFacultyemail(faculty.facultyemail);
        setFacultyphone(faculty.facultyphone);
        setFacultydesignation(faculty.facultydesignation);

        setEditing(true);
    };

    const deleteFaculty = async (id) => {

        try {

            const response = await api.delete(
                "/deletefaculty",
                {
                    data: {
                        facultyid: id
                    }
                }
            );

            alert(response.data.message);

            getFaculty();

        } catch (error) {

            console.log(error);
            alert("Error deleting faculty!");
        }
    };

    const clearForm = () => {

        setFacultyid("");
        setFacultyname("");
        setFacultyemail("");
        setFacultyphone("");
        setFacultydesignation("");
        setFacultypassword("");

        setEditing(false);
    };

    return (
        <div>

            <h2>Manage Faculty</h2>

            <form onSubmit={saveFaculty}>

                <input
                    type="number"
                    placeholder="Faculty ID"
                    value={facultyid}
                    onChange={(e) => setFacultyid(e.target.value)}
                    required
                    disabled={editing}
                />

                <input
                    type="text"
                    placeholder="Faculty Name"
                    value={facultyname}
                    onChange={(e) => setFacultyname(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Faculty Email"
                    value={facultyemail}
                    onChange={(e) => setFacultyemail(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Faculty Phone"
                    value={facultyphone}
                    onChange={(e) => setFacultyphone(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Designation"
                    value={facultydesignation}
                    onChange={(e) => setFacultydesignation(e.target.value)}
                    required
                />

                {!editing && (
                    <input
                        type="password"
                        placeholder="Faculty Password"
                        value={facultypassword}
                        onChange={(e) =>
                            setFacultypassword(e.target.value)
                        }
                        required
                    />
                )}

                <button type="submit">
                    {editing ? "Update Faculty" : "Add Faculty"}
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

            <h3>Faculty List</h3>

            <table border="1">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {faculties.map((faculty) => (

                        <tr key={faculty._id}>

                            <td>{faculty.facultyid}</td>
                            <td>{faculty.facultyname}</td>
                            <td>{faculty.facultyemail}</td>
                            <td>{faculty.facultyphone}</td>
                            <td>{faculty.facultydesignation}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        editFaculty(faculty)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteFaculty(
                                            faculty.facultyid
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

export default ManageFaculty;