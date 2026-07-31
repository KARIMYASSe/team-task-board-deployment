import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import DashBoard from "./Pages/DashBoard/DashBoard";
import { UserContextProvider } from "./context/AuthContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails";
import LayoutTwo from "./components/Layout/LayoutTwo";
import CreateProject from "./Pages/CreateProject/CreateProject";
import Projects from "./Pages/Projects/Projects";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

export default function App() {
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Register />,
        },
      ],
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <LayoutTwo />,
          children: [
            {
              path: "dashboard",
              element: <DashBoard />,
            },
            {
              path: "admin",
              element: <AdminDashboard />,
            },
            {
              path: "projects",
              element: <Projects />,
            },
            {
              path: "projectDetails/:id",
              element: <ProjectDetails />,
            },
            {
              path: "createProject",
              element: <CreateProject />,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <ProjectContextProvider>
        <UserContextProvider>
          <RouterProvider router={Routes} />
        </UserContextProvider>
      </ProjectContextProvider>
    </div>
  );
}
