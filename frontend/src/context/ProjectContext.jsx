import axios from "axios";
import { createContext, useState } from "react";

export const ProjectContext = createContext(null);

export function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    setProjects(data);
  }

  return (
    <ProjectContext.Provider
      value={{
        getProjects,
        projects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
