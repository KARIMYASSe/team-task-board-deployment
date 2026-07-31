import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const { projects, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    getProjects();
  }, []);

  if (user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const currentUserId = user?._id || user?.id;

  const ownedProjects = projects.filter((project) => {
    const ownerId =
      typeof project.owner === "object" ? project.owner._id : project.owner;

    return String(ownerId) === String(currentUserId);
  });

  const totalMembers = projects.reduce((total, project) => {
    return total + (project.members?.length || 0);
  }, 0);

  const recentProjects = [...projects]
    .sort(
      (firstProject, secondProject) =>
        new Date(secondProject.createdAt) - new Date(firstProject.createdAt),
    )
    .slice(0, 5);

  return (
    <main className="min-w-0 flex-1 px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-400">
              Administration
            </p>

            <h1 className="mt-3 text-3xl font-bold">Admin Dashboard</h1>

            <p className="mt-2 text-slate-400">
              Welcome back, {user?.firstName || "Admin"}. Manage the application
              projects from here.
            </p>
          </div>

          <Link
            to="/projects"
            className="rounded-xl bg-violet-600 px-6 py-3 text-center text-sm font-semibold transition hover:bg-violet-500"
          >
            View All Projects
          </Link>
        </div>

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-800 bg-[#0c1228] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
              📁
            </div>

            <p className="mt-5 text-sm text-slate-400">Total Projects</p>

            <p className="mt-2 text-3xl font-bold">{projects.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#0c1228] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-2xl">
              👥
            </div>

            <p className="mt-5 text-sm text-slate-400">Project Members</p>

            <p className="mt-2 text-3xl font-bold">{totalMembers}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#0c1228] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600/20 text-2xl">
              👑
            </div>

            <p className="mt-5 text-sm text-slate-400">Projects You Own</p>

            <p className="mt-2 text-3xl font-bold">{ownedProjects.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#0c1228] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-600/20 text-2xl">
              🛡️
            </div>

            <p className="mt-5 text-sm text-slate-400">Your Role</p>

            <p className="mt-2 text-2xl font-bold capitalize text-violet-300">
              {user?.role}
            </p>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="mt-8 rounded-3xl border border-slate-800 bg-[#0c1228] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Recent Projects</h2>

              <p className="mt-1 text-sm text-slate-400">
                Recently created projects in the application.
              </p>
            </div>

            <Link
              to="/projects"
              className="text-sm font-semibold text-violet-300 hover:text-violet-200"
            >
              See all →
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-10 text-center">
              <p className="text-slate-400">No projects found.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {recentProjects.map((project) => {
                const owner =
                  typeof project.owner === "object" ? project.owner : null;

                const ownerName = owner
                  ? `${owner.firstName || ""} ${owner.lastName || ""}`.trim()
                  : "Project owner";

                return (
                  <div
                    key={project._id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-[#11172a] p-5 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">{project.name}</h3>

                      <p className="mt-1 truncate text-sm text-slate-400">
                        {project.description || "No project description"}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Owner: {ownerName} · {project.members?.length || 0}{" "}
                        members
                      </p>
                    </div>

                    <Link
                      to={`/projectDetails/${project._id}`}
                      className="shrink-0 rounded-xl border border-violet-500 px-4 py-2.5 text-center text-sm font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                    >
                      Manage
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
