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
        <DashBoard/>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'addCamp',
        element: <AdminRoute><AddCamp/></AdminRoute>
      }
    ]
    
  },
  {
    path: "/*",
    element: <div>Error</div>,
  },
]);
export default Router;
