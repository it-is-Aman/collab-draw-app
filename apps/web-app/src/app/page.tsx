import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <main className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse"></div>
          <h1 className="relative text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">
            Draw Your Imagination
          </h1>
        </div>

        <p className="mt-4 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          A collaborative whiteboard for teams to brainstorm, sketch, and innovate together in real-time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/signin"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-8 py-4 rounded-full bg-transparent border-2 border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-20 relative w-full max-w-4xl aspect-video rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:text-gray-300 transition-colors">
            <span className="text-lg">Interactive Demo Preview</span>
          </div>
          {/* Placeholder for a demo image or canvas preview */}
        </div>
      </main>

      <footer className="absolute bottom-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Drawvia. All rights reserved.
      </footer>
    </div>
  );
}
