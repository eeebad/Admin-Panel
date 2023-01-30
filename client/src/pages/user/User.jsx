import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/datatable/Datatable";
// import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const User = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10)

  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];

  const userColumns = [
    { 
        field: "id", headerName: "ID", width: 70 },
    { 
        field: "title",
         headerName: "profileImage", width: 170 },
    {
    //   field: "firstname",
      headerName: "User",
      width: 230,
      //   renderCell: (params) => {
      //     return (
      //       <div className="cellWithImg">
      //         <img className="cellImg" src={params.row.img} alt="avatar" />
      //         {params.row.username}
      //       </div>
      //     );
      //   },
    },
    {
    //   field: "lastname",
      headerName: "LAST",
      width: 230,
      //   renderCell: (params) => {
      //     return (
      //       <div className="cellWithImg">
      //         <img className="cellImg" src={params.row.img} alt="avatar" />
      //         {params.row.username}
      //       </div>
      //     );
      //   },
    },
    {
    //   field: "email",
      headerName: "Email",
      width: 230,
    },

    // {
    //   field: "age",
    //   headerName: "Age",
    //   width: 100,
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   //   renderCell: (params) => {
    //   //     return (
    //   //       <div className={`cellWithStatus ${params.row.status}`}>
    //   //         {params.row.status}
    //   //       </div>
    //   //     );
    //   //   },
    // },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="cellAction">
            <Link to={`/users/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              //   onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`user`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setUsers(response.data.user);
    };
    const getTodos = () => {
      fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        .then((response) => response.json())
        .then((json) => setUsers(users.concat(json)));
      
    };

    // getUsers();
    getTodos();
  }, [limit]);

  return (
    <div>
      <Link to="/users/create">Add new user</Link>
      {/* <Datatable/> */}
      {users && (
        <DataGrid
          autoHeight={true}
          className="datagrid"
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={limit}
          onPageSizeChange={() => setLimit(limit + 10)}
          rowsPerPageOptions={[limit]}
          checkboxSelection
        //   getRowId={(row) => row?._id}
        pagination
          onPageChange={()=>setLimit(limit + 10)}
        />
      )}
      {/* <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Profile Image</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="tableCell">{user._id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={user.profileImage} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">{user.firstname + " " + user.lastname}</TableCell>
                <TableCell className="tableCell">{user.email}</TableCell>
                <TableCell className="tableCell"><span className={`status ${user.status}`}>{user.status}</span></TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link to={`/users/edit/${user._id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton">View</div>
                    </Link>
                    <div
                      className="deleteButton"
                      //   onClick={() => handleDelete(params.row.id)}
                    >
                      Delete
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default User;
