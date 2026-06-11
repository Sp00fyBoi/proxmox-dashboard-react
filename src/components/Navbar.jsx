export default function Navbar() {
  return (
    <header className="bg-black text-white px-6 h-16 flex justify-between items-center shadow-md sticky top-0 z-50">
      
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold">VM Dashboard</span>

        <nav className="hidden md:flex gap-6">
          <span className="font-bold border-b-2 pb-1">
            Dashboard
          </span>

          <span className="text-gray-400 hover:text-white cursor-pointer">
            Create VM
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full">
          <span className="material-symbols-outlined">refresh</span>
        </button>

        <button className="p-2 hover:bg-white/10 rounded-full">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
