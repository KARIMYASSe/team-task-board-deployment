export default function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-slate-800 bg-[#070b1c] px-6 py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">
            Team<span className="text-violet-500">Board</span>
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage projects, tasks, and teams in one place.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="/login"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Login
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-500">
          © 2026 TeamBoard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
