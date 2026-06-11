export default function SearchBar({ search, setSearch, statusFilter, setStatusFilter, onRefresh }) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container-lowest p-4 border border-outline-variant/30 custom-shadow w-full">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
          search
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-body-md font-body-md placeholder:text-outline focus:outline-none"
          placeholder="Search by VM name or ID"
          type="text"
        />
      </div>

      {/* Filter Options & Sync */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="relative flex-1 md:flex-initial">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto bg-surface-container-low border-none rounded-lg px-4 py-2 pr-10 text-body-md font-body-md focus:ring-2 focus:ring-primary/20 cursor-pointer appearance-none"
          >
            <option value="All Status">All Status</option>
            <option value="Running">Running</option>
            <option value="Stopped">Stopped</option>
            <option value="Provisioning">Provisioning</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-on-surface-variant text-base">
            expand_more
          </span>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">
            sync
          </span>
          <span className="font-label-md text-label-md">Refresh</span>
        </button>
      </div>
    </section>
  );
}