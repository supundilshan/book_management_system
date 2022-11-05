import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateAuthor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [fname, setFname] = useState(location.state.First_name);
    const [lname, setLname] = useState(location.state.Last_Name);

    const UpdateAuthor = (e) => {
        e.preventDefault();
        const object = { First_Name: fname, Last_Name: lname }
        axios.put(`http://localhost:3001/author/${location.state.ID}`, object)
            .then(() => {
                console.log("Value Updated");
            })
            .catch((err) => { console.log(err) });

        // After updating data navigate user to authors page
        navigate(`/authors`);
    };

    return (
        <div>
            <h2>Change The Name of {location.state.First_name} {location.state.Last_Name} </h2>
            <form onSubmit={UpdateAuthor}>
                <table>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value={fname} onChange={(event) => { setFname(event.target.value) }} /></td>
                            <td><input type="text" value={lname} onChange={(event) => { setLname(event.target.value) }} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateAuthor;