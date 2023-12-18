import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Services from "../Pages/Services";
import SignUp from "../Pages/SignUp";
import Doctors from "../Pages/Doctors/Doctors";
import DoctorsDetail from "../Pages/Doctors/DoctorsDetail";
import MyAccount from "../DashBoard/user-dashBoard/MyAccount";
import DoctorAccount from "../DashBoard/doctor-dashBoard/DoctorAccount";
import ProctectedRoutes from "./ProctectedRoutes";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorsDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services" element={<Services />} />

        {/* Dashboard routes */}
        <Route
          path="/users/profile/me"
          element={
            <ProctectedRoutes allowedRoles={['patient']}>
              <MyAccount />
            </ProctectedRoutes>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProctectedRoutes allowedRoles={['doctor']}>
              <DoctorAccount />
            </ProctectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default Router;
