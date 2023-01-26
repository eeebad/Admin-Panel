import { Suspense, useContext, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
import PersistLogin from "./utils/PersistLogin";

const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const User = lazy(() => import("./pages/user/User"));
const Single = lazy(() => import("./pages/single/Single"));
const CreateUser = lazy(() => import("./pages/user/CreateUser"));

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Suspense fallback={<>loading...</>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route element={<PersistLogin />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<User />} />
                <Route path=":userId" element={<Single />} />
                <Route path="create" element={<CreateUser />} />
              </Route>
            </Route>

            {/* 
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
