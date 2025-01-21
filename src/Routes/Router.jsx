import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import AuthLayout from "../Components/AuthLayout/AuthLayout/AuthLayout";
import Login from "../Components/AuthLayout/Login/Login";
import Register from "../Components/AuthLayout/Register/Register";
import AvailableCamps from "../Pages/AvailableCamp/AvailableCamp";
import CampDetails from "../Pages/CampDetails/CampDetails";

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
        element: <AvailableCamps></AvailableCamps>
      },
      {
        path: "/campDetails/:id",
        element: <CampDetails></CampDetails>

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
    path: "/*",
    element: <div>Error</div>,
  },
]);
export default Router;
