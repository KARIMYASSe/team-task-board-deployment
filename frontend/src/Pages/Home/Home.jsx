import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b1c] text-white">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Simple Team Management
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Manage Projects.
            <br />
            Assign Tasks.
            <br />
            <span className="text-violet-500">Get Things Done.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            TeamBoard helps your team organize projects, assign tasks, follow
            progress, and finish work on time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-lg bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold transition hover:border-violet-500 hover:text-violet-400"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-violet-950/40">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Project Overview</p>

              <h2 className="mt-1 text-2xl font-bold">Team Dashboard</h2>
            </div>

            <div className="h-10 w-10 rounded-full bg-violet-600" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Projects</p>

              <p className="mt-2 text-2xl font-bold">12</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Tasks</p>

              <p className="mt-2 text-2xl font-bold">38</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Members</p>

              <p className="mt-2 text-2xl font-bold">8</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-800 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Website Redesign</p>

              <span className="text-sm text-violet-400">75%</span>
            </div>

            <div className="h-2 rounded-full bg-slate-700">
              <div className="h-2 w-3/4 rounded-full bg-violet-600" />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">To Do</p>

              <p className="mt-2 font-semibold">Design landing page</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">In Progress</p>

              <p className="mt-2 font-semibold">Build authentication</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#0b1023] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Everything your team needs
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Manage projects, organize tasks, and collaborate with your team
              from one simple workspace.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Project Management */}
            <div className="rounded-2xl border border-slate-800 bg-[#11172a] p-6 transition hover:-translate-y-1 hover:border-violet-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20 text-2xl">
                📁
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Project Management
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Create, organize, update, and manage all your projects in one
                place.
              </p>
            </div>

            {/* Task Tracking */}
            <div className="rounded-2xl border border-slate-800 bg-[#11172a] p-6 transition hover:-translate-y-1 hover:border-violet-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">
                ✓
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Task Tracking
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Follow every task from To Do to In Progress and Done.
              </p>
            </div>

            {/* Team Collaboration */}
            <div className="rounded-2xl border border-slate-800 bg-[#11172a] p-6 transition hover:-translate-y-1 hover:border-violet-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-2xl">
                👥
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Team Collaboration
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Add team members and assign each task to the right person.
              </p>
            </div>

            {/* Priority and Deadlines */}
            <div className="rounded-2xl border border-slate-800 bg-[#11172a] p-6 transition hover:-translate-y-1 hover:border-violet-500">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-2xl">
                ⚡
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Priorities & Deadlines
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Set priorities and due dates to keep important work on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* how-it-works */}

      <section id="how-it-works" className="bg-[#070b1c] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Start managing your work in 3 steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
           
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Create a Project
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Create your project and add a simple description for your team.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Add Your Team
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Add members to the project and assign tasks to the right people.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Track Progress
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Follow task status and keep your project moving until everything
                is done.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
