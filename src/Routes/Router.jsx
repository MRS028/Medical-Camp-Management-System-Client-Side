import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import AuthLayout from "../Components/AuthLayout/AuthLayout/AuthLayout";
import Login from "../Components/AuthLayout/Login/Login";
import Register from "../Components/AuthLayout/Register/Register";
import AvailableCamps from "../Pages/AvailableCamp/AvailableCamp";
import CampDetails from "../Pages/CampDetails/CampDetails";
import JoinCampModal from "../Pages/JoinCCamp/JoinCampModal";
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
import DashBoardSideBar from "../Dashboard/Dashboard/DashBoardSideBar";
import OrganizerProfile from "../Dashboard/Admin/OrganizerProfile/OrganizerProfile";
import Payment from "../Dashboard/Payment/Payment";

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
        path: "dashBoardSideBar",
        element: <DashBoardSideBar />,
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
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
  {
    path: "/*",
    element: <div>Error</div>,
  },
]);
export default Router;
