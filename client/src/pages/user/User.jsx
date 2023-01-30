import React from 'react';
import { Link } from 'react-router-dom';
import Datatable from "../../components/datatable/Datatable"

const User = () => {
    return (
        <div >
        <Link to="/users/create">Add new user</Link>
        <Datatable/>
    </div>
    );
};

export default User;