import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [verification, setVerification] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // let isMounted = true;

    const verifyRefreshToken = async () => {
    // console.log("inside refresh");

      try {
        await refresh();
      } catch (err) {
        console.error(err);
        console.log('here')
        setVerification(false)
        // return <Navigate to="/login" state={{ from: location }} replace />
      } 
    //   finally {
    //     // isMounted &&
    //     setIsLoading(false);
    //     console.log("inside finally");
    //   }
    };

    const verifyTokenExp = async (token) => {
    console.log("inside veri");

        const checkExp = JSON.parse(window.atob(token.split(".")[1]))
        checkExp.exp * 1000 < Date.now() && verifyRefreshToken() 

    }

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    auth?.accessToken ? verifyTokenExp(auth.accessToken) : verifyRefreshToken() 
    // verifyRefreshToken()
        // return () => isMounted = false;
  }, [location]);



  return <>
  { 
  verification ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  }
  </>;
};

export default PersistLogin;
