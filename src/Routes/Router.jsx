import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import AuthLayout from "../Components/AuthLayout/AuthLayout/AuthLayout";
import Login from "../Components/AuthLayout/Login/Login";
import Register from "../Components/AuthLayout/Register/Register";
import AvailableCamps from "../Pages/AvailableCamp/AvailableCamp";
import CampDetails from "../Pages/CampDetails/CampDetails";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Dashboard/Dashboard/DashBoard";
import AdminRoute from "./AdminRoute";
import AddCamp from "../Dashboard/AddCamp/AddCamp";
import AllUsers from "../Dashboard/Users/AllUsers";
import ManageCamp from "../Dashboard/ManageCamp/ManageCamp";
import ParticipantProfile from "../Dashboard/Participant/ParticipantProfile/ParticipantProfile";
import RegisteredCamps from "../Dashboard/Participant/RegisteredCamps/RegisteredCamps";
import ManageRegisteredCamps from "../Dashboard/Admin/ManageRegisteredCamps/ManageRegisteredCamps";
import Analytics from "../Dashboard/Participant/Analytic/Analytics";
import PaymentHistory from "../Dashboard/Participant/PaymentHistory/PaymentHistory";
import OrganizerProfile from "../Dashboard/Admin/OrganizerProfile/OrganizerProfile";
import Payment from "../Dashboard/Payment/Payment";
import AdminHome from "../Dashboard/Admin/AdminHome/AdminHome";
import UserHome from "../Dashboard/Participant/UserHome/UserHome";
import Home from "../Home/Home/Home";
import Doctors from "../Pages/Doctor/Doctors";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForgotPassword from "../Components/AuthLayout/ForgetPassword/ForgotPassword";
import PaymentSuccess from "../Dashboard/Payment/PaymentSuccess";
import AboutUs from "../Components/AboutUs/AboutUs";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCamps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/doctors",
        element: <Doctors></Doctors>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>,
      },
      {
        path: "/campDetails/:id",
        element: (
          <PrivateRoute>
            <CampDetails></CampDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
          {
            path: "/auth/forgot-password",
            element: <ForgotPassword/> ,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "addCamp",
        element: (
          <AdminRoute>
            <AddCamp />
          </AdminRoute>
        ),
      },
      {
        path: "adminHome",
        element: <AdminRoute>
          <AdminHome />
        </AdminRoute>,
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageCamps",
        element: (
          <AdminRoute>
            <ManageCamp />
          </AdminRoute>
        ),
      },
      {
        path: "manageRegisteredCamps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps />
          </AdminRoute>
        ),
      },
      {
        path: "organizerProfile",
        element: (
          <AdminRoute>
            <OrganizerProfile />
          </AdminRoute>
        ),
      },
      //participant routes
      {
        path: "userHome",
        element: <UserHome/>,
      },
      {
        path: "profile",
        element: <ParticipantProfile />,
      },
      {
        path: "registeredCamps",
        element: <RegisteredCamps />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment-success/:trxnId",
        element: <PaymentSuccess />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage/>,
  },
]);
export default Router;
