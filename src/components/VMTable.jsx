export default function VMTable({ data }) {
  return (
    <div className="bg-white rounded-lg border shadow overflow-hidden">
      <table className="w-full">
        
        <thead className="bg-gray-100 text-gray-500 text-sm uppercase">
          <tr>
            <th className="px-6 py-4 text-left">VM ID</th>
            <th>Name</th>
            <th>Status</th>
            <th className="text-center">CPU</th>
            <th className="text-center">Memory</th>
            <th>Node</th>
            <th className="text-right px-6">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((vm) => (
            <tr key={vm.id} className="hover:bg-gray-50">

              <td className="px-6 py-4 text-gray-400 text-sm">
                {vm.id}
              </td>

              <td className="font-semibold">
                {vm.name}
              </td>

              <td>
                {vm.status === "Running" ? (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 w-fit">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    Running
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 w-fit">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Stopped
                  </span>
                )}
              </td>

              <td className="text-center">{vm.cpu}</td>
              <td className="text-center">{vm.memory}</td>

              <td className="text-gray-500 text-sm">
                {vm.node}
              </td>

              <td className="px-6 text-right space-x-2">
                
                {vm.status === "Running" ? (
                  <button className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                    <span className="material-symbols-outlined text-sm">
                      stop
                    </span>
                  </button>
                ) : (
                  <button className="p-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                    <span className="material-symbols-outlined text-sm">
                      play_arrow
                    </span>
                  </button>
                )}

                <button className="p-2 border rounded-lg hover:bg-gray-100">
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
