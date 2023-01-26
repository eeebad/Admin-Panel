import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./login.scss"

const Login = () => {
  const navigate = useNavigate()
  const {setAuth} = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async () => {

    try {
      
      let payload = {
        email,
        password
      };
  
      const response = await axios.post(`auth/login`, payload, {
        withCredentials: true
    })

      const accessToken = response.data.accessToken
 
      setAuth({accessToken})

      navigate("/");

    } catch (error) {
      console.log(error,"error")
    }
    
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleSubmit}>login</button>
    </div>
  )
}

export default Login