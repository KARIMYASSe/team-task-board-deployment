import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../context/ProjectContext";
import { UserContext } from "../../context/AuthContext";

export default function Projects() {
  const { projects, getProjects } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <main className="min-w-0 flex-1 px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-400">
            Workspace
          </p>

          <h1 className="mt-3 text-3xl font-bold">All Projects</h1>

          <p className="mt-2 text-slate-400">
            View all projects that you own or have joined.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-[#0c1228] p-12 text-center">
            <p className="text-4xl">📁</p>

            <h2 className="mt-4 text-xl font-bold">No projects found</h2>

            <p className="mt-2 text-slate-400">
              Create your first project to start managing tasks.
            </p>

            <Link
              to="/createProject"
              className="mt-6 inline-block rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
            >
              + Create Project
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => {
              const ownerId =
                typeof project.owner === "object"
                  ? project.owner._id
                  : project.owner;

              const userId = user?._id || user?.id;

              const isOwner = ownerId === userId;

              return (
                <div
                  key={project._id}
                  className="rounded-3xl border border-slate-800 bg-[#0c1228] p-6 transition hover:-translate-y-1 hover:border-violet-500/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
                      📁
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isOwner
                          ? "bg-violet-500/15 text-violet-300"
                          : "bg-blue-500/15 text-blue-300"
                      }`}
                    >
                      {isOwner ? "Owner" : "Member"}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold">{project.name}</h2>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                    {project.description || "No project description"}
                  </p>

                  <div className="mt-6 border-t border-slate-800 pt-4">
                    <p className="text-sm text-slate-400">
                      👥 {project.members?.length || 0} members
                    </p>
                  </div>

                  <Link
                    to={`/projectDetails/${project._id}`}
                    className="mt-5 block rounded-xl border border-violet-500 px-4 py-3 text-center text-sm font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                  >
                    Open Project →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
