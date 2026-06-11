export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border shadow">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>

        <input
          type="text"
          placeholder="Search by VM name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <select className="bg-gray-100 px-4 py-2 rounded-lg">
          <option>All Status</option>
          <option>Running</option>
          <option>Stopped</option>
        </select>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
          <span className="material-symbols-outlined text-lg">
            sync
          </span>
          Refresh
        </button>
      </div>
    </div>
  );
}