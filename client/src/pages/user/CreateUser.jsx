import "./user.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { auth } = useAuth();
  const navigate = useNavigate()
  const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profileImage: "",
  };

  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    let formData = new FormData();
    for (const key in data) formData.append(key, data[key]);

    const response = await axios.post(`user`, formData, {
      headers:{
        'Authorization': `Bearer ${auth.accessToken}`,
      }
    });

    if(response){
      const {code, message} =response.data
      code === 201 ? alert(message) : alert(code)
      navigate("/users")
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Add new user</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                data.profileImage
                  ? URL.createObjectURL(data.profileImage)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setData({...data, profileImage: e.target.files[0]})}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Firstname</label>
                <input
                  name="firstname"
                  onChange={handleChange}
                  type="text"
                  placeholder="Firstname"
                />
              </div>
              <div className="formInput">
                <label>Lastname</label>
                <input
                  name="lastname"
                  onChange={handleChange}
                  type="text"
                  placeholder="Lastname"
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
