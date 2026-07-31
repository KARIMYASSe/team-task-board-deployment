import { useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { Link } from "react-router-dom";

export default function DashBoard() {
  const { getProjects, projects } = useContext(ProjectContext);

  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user]);

  console.log(projects);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in first</div>;
  }

  const userId = user._id || user.id;

  const ownedProjectsCount = projects.filter((project) => {
    const ownerId =
      typeof project.owner === "object" ? project.owner?._id : project.owner;

    return ownerId?.toString() === userId?.toString();
  }).length;

  const myProjectsCount = projects.length;

  const joinedProjectsCount = myProjectsCount - ownedProjectsCount;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <main className="flex-1 px-6 py-8 lg:px-10">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.firstName}</h1>

          <p className="mt-2 text-slate-400">
            Here is an overview of your workspace.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-xl font-bold uppercase">
          {user.firstName.charAt(0)}
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* My Projects */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1228] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">My Projects</p>

              <p className="mt-3 text-3xl font-bold">{myProjectsCount}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
              📁
            </div>
          </div>
        </div>

        {/* Owned Projects */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1228] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Owned Projects</p>

              <p className="mt-3 text-3xl font-bold">{ownedProjectsCount}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
              ♛
            </div>
          </div>
        </div>

        {/* Joined Projects */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1228] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Joined Projects</p>

              <p className="mt-3 text-3xl font-bold">{joinedProjectsCount}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
              👥
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Recent Projects</h2>

            <p className="mt-1 text-sm text-slate-400">
              Your latest projects and team workspaces.
            </p>
          </div>

          <Link to={"/createProject"}>
          <button
            type="button"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            + Create Project
          </button>
          </Link>
        </div>

        {/* Projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recentProjects.map((project) => {
            const ownerId =
              typeof project.owner === "object"
                ? project.owner?._id
                : project.owner;

            const isOwner = ownerId?.toString() === userId?.toString();

            return (
              <div
                key={project._id}
                className="rounded-2xl border border-slate-800 bg-[#0c1228] p-6 transition hover:-translate-y-1 hover:border-violet-500"
              >
                {/* Project Name */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/20 text-xl">
                    📁
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isOwner
                        ? "bg-violet-600/20 text-violet-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {isOwner ? "Owner" : "Member"}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold">{project.name}</h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                  {project.description || "No project description"}
                </p>

                {/* Members */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <p className="text-sm text-slate-400">
                    👥 {project.members?.length || 0} members
                  </p>
                </div>

                {/* Open Button */}
                <Link to={"/projectDetails/" + project._id}>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-violet-500 px-4 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                  >
                    Open Project →
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
