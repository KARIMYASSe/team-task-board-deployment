import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../../validation/authValidation";

export default function Login() {
  let { getUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: "onTouched",
  });
  const nav = useNavigate();

  async function handleLogin(value) {
    const { data, status } = await axios.post(
      "http://localhost:3000/users/signin",
      value,
    );

    console.log(data);
    console.log(status);

    if (status === 201) {
      localStorage.setItem("token", data.accessToken);
      await getUser();
      nav("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-[#06091a] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0b1023] shadow-2xl shadow-violet-950/30 lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-900 to-[#080c20] p-12 lg:flex lg:flex-col lg:justify-between">
          {/* Background Decorations */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          {/* Logo */}
          <button
            type="button"
            onClick={() => nav("/")}
            className="relative z-10 flex w-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold backdrop-blur">
              ✓
            </div>

            <h2 className="text-2xl font-bold">
              Team<span className="text-violet-200">Board</span>
            </h2>
          </button>

          {/* Main Content */}
          <div className="relative z-10">
            <p className="inline-block rounded-full border border-violet-300/20 bg-white/5 px-4 py-2 text-sm text-violet-200">
              Welcome back
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight xl:text-5xl">
              Continue managing
              <br />
              your projects
              <br />
              <span className="text-violet-300">with your team.</span>
            </h1>

            <p className="mt-6 max-w-md leading-7 text-violet-100/80">
              Sign in to access your projects, organize tasks, and follow your
              team's progress.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  📁
                </div>

                <div>
                  <h3 className="font-semibold">Access Your Projects</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Continue working on all your active projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">Manage Your Tasks</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Update task status and stay on schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                  👥
                </div>

                <div>
                  <h3 className="font-semibold">Work With Your Team</h3>

                  <p className="mt-1 text-sm leading-6 text-violet-100/70">
                    Collaborate with project owners and members.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-violet-200/70">
            © 2026 TeamBoard
          </p>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <button
              type="button"
              onClick={() => nav("/")}
              className="mb-9 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold">
                ✓
              </div>

              <h2 className="text-2xl font-bold">
                Team<span className="text-violet-500">Board</span>
              </h2>
            </button>

            {/* Form Heading */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-violet-400">
                Welcome Back
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Log in to your account
              </h2>

              <p className="mt-3 text-slate-400">
                Enter your email and password to continue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="mt-8 space-y-5"
            >
              {/* Email */}
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

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-violet-400 transition hover:text-violet-300"
                  >
                    Forgot password?
                  </button>
                </div>

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

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                <input type="checkbox" className="h-4 w-4 accent-violet-600" />

                <span>Remember me</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-400"
              >
                Log In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => nav("/signup")}
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
