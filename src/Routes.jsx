import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import { useSelector } from "react-redux";

const AppRouts = (props) => {
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route path="/">
              <Route index element={<Home />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouts;
