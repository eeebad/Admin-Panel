import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // let isMounted = true;
    console.log("inside persist");

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        // isMounted &&
        setIsLoading(false);
        console.log("inside finally");
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    // return () => isMounted = false;
  }, []);

  // useEffect(() => {
  //     console.log(`isLoading: ${isLoading}`)
  //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])

  return <>{isLoading ?  <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
