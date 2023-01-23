import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import "./login.scss"

const Login = () => {
  const {setAuth} = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = () => {

    try {
      let payload = {
        email,
        password
      };
  
      const response = axios.post(`login`, payload)
  
      console.log(response.data,"login resposne")
  
      setAuth({})
     
      console.log(payload)
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