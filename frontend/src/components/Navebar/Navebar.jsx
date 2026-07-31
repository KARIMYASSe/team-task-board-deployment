import { Link } from 'react-router-dom';

export default function Navebar() {
  return (
    <nav className="w-full bg-[#070b1c] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-xl font-bold">
            ✓
          </div>

          <span className="text-2xl font-bold">
            TeamBoard
          </span>
        </Link>

        
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#benefits"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Benefits
          </a>

          <a
            href="#about"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-slate-600 px-5 py-2 text-sm font-medium transition hover:border-violet-500 hover:text-violet-400"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold transition hover:bg-violet-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}