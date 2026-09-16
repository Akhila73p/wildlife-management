function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-20 px-10 py-7">

      <div className="flex items-center">
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center text-2xl shadow-lg">
            🌿
          </div>

          <div>
            <h2 className="text-white font-bold text-lg tracking-wide">
              WILDLIFE INTELLIGENCE
            </h2>

            <p className="text-slate-300 text-xs tracking-widest">
              MONITORING SYSTEM
            </p>
          </div>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;