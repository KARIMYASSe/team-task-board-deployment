import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  async function createProjectHandle(value) {
    const token = localStorage.getItem("token");

    const { data, status } = await axios.post(
      "http://localhost:3000/projects/create",
      value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(data);
    console.log(status);

    if (status === 201) {
      nav("/dashboard");
    }
  }

  return (
    <main className="flex-1 px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-400">
            New Project
          </p>

          <h1 className="mt-3 text-3xl font-bold">Create a new project</h1>

          <p className="mt-2 text-slate-400">
            Add your project information to start organizing tasks and team
            members.
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-[#0c1228] shadow-xl shadow-black/20">
          {/* Card Top */}
          <div className="border-b border-slate-800 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-2xl">
                📁
              </div>

              <div>
                <h2 className="text-lg font-semibold">Project information</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Enter a name and a short description for your project.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(createProjectHandle)}
            className="space-y-6 p-6 sm:p-8"
          >
            {/* Project Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Project name
              </label>

              <input
                type="text"
                {...register("name")}
                id="name"
                className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                placeholder="Example: Team Management System"
              />

              <p className="mt-2 text-xs text-slate-500">
                Choose a clear name that describes the project.
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                {...register("description")}
                id="description"
                rows="6"
                className="w-full resize-none rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                placeholder="Describe the project, its goals, and what the team will work on..."
              />

              <p className="mt-2 text-xs text-slate-500">
                You can update this description later.
              </p>
            </div>

            {/* Information Box */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-600/10 p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">💡</span>

                <div>
                  <p className="text-sm font-medium text-violet-200">
                    You will become the project owner
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    After creating the project, you can open it, manage its
                    tasks, and add team members.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => nav("/dashboard")}
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-400"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
