import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../../validation/authValidation";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "onTouched",
  });
  let nav = useNavigate();

  async function handleRegister(value) {
    const { data, status } = await axios.post(
      "http://localhost:3000/users/signup",
      value,
    );

    if (status == 201) {
      nav("/login");
    }
  }

  return (
    <main className="min-h-screen bg-[#06091a] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0b1023] shadow-2xl shadow-violet-950/30 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-900 to-[#080c20] p-12 lg:flex lg:flex-col lg:justify-between">
          {/* Background Decorations */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold backdrop-blur">
              ✓
            </div>

            <h2 className="text-2xl font-bold">
              Team<span className="text-violet-200">Board</span>
            </h2>
          </div>

          <div className="relative z-10">
            <p className="inline-block rounded-full border border-violet-300/20 bg-white/5 px-4 py-2 text-sm text-violet-200">
              Organize. Collaborate. Achieve.
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight xl:text-5xl">
              Create your account
              <br />
              and get started
              <br />
              <span className="text-violet-300">in minutes.</span>
            </h1>

            <p className="mt-6 max-w-md leading-7 text-violet-100/80">
              Manage your projects, organize tasks, and collaborate with your
              team from one simple workspace.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  📁
                </div>

                <div>
                  <h3 className="font-semibold">Manage Projects</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Create and organize all your projects in one place.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">Track Tasks</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Assign tasks, set deadlines, and follow progress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  📈
                </div>

                <div>
                  <h3 className="font-semibold">Boost Productivity</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Help your team collaborate and finish work faster.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-violet-200/70">
            © 2026 TeamBoard
          </p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-9 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold">
                ✓
              </div>

              <h2 className="text-2xl font-bold">
                Team<span className="text-violet-500">Board</span>
              </h2>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-400">
                Create Account
              </p>

              <h2 className="mt-3 text-3xl font-bold">Join TeamBoard</h2>

              <p className="mt-3 text-slate-400">
                Fill in your information to create your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleRegister)}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    {...register("firstName")}
                    id="firstName"
                    className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="Karim"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    {...register("lastName")}
                    id="lastName"
                    className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="Yasser"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  placeholder="karim@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  id="password"
                  className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmpassword"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  {...register("confirmPassword")}
                  id="confirmpassword"
                  className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  placeholder="Enter your password again"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-400"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => nav("/login")}
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
