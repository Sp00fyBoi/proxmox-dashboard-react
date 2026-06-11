import { useNavigate } from "react-router-dom";
import { useVM } from "../context/VMContext";
import { useState } from "react";

export default function VMTable({ data }) {
  const navigate = useNavigate();
  const { startVM, stopVM } = useVM();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination calculations
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Running":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-label-md text-label-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Running
          </span>
        );
      case "Stopped":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/50 text-error font-label-md text-label-md">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            Stopped
          </span>
        );
      case "Provisioning":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-label-md text-label-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
            Provisioning
          </span>
        );
    }
  };

  return (
    <section className="bg-surface-container-lowest border border-outline-variant/30 custom-shadow overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low text-secondary border-b border-outline-variant/30">
            <tr>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider">VM ID</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider text-center">CPU</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider text-center">Memory</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider">Node</th>
              <th className="px-6 py-4 font-label-md text-label-md uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-on-surface-variant font-body-md">
                  No virtual machines found matching search/filter.
                </td>
              </tr>
            ) : (
              paginatedData.map((vm) => (
                <tr key={vm.id} className="hover:bg-surface-container transition-colors duration-150">
                  <td className="px-6 py-4 mono-id">{vm.id}</td>
                  <td className="px-6 py-4 font-semibold text-primary font-body-md">{vm.name}</td>
                  <td className="px-6 py-4">{getStatusBadge(vm.status)}</td>
                  <td className="px-6 py-4 text-center font-label-md">{vm.cpu}</td>
                  <td className="px-6 py-4 text-center font-label-md">{vm.memory}</td>
                  <td className="px-6 py-4 font-body-sm text-on-surface-variant">{vm.node}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {vm.status === "Running" && (
                        <button
                          onClick={() => stopVM(vm.id)}
                          className="p-1.5 rounded-lg border border-error text-error hover:bg-error/10 transition-colors"
                          title="Stop VM"
                        >
                          <span className="material-symbols-outlined text-[18px] block">stop</span>
                        </button>
                      )}
                      {vm.status === "Stopped" && (
                        <button
                          onClick={() => startVM(vm.id)}
                          className="p-1.5 rounded-lg border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Start VM"
                        >
                          <span className="material-symbols-outlined text-[18px] block">play_arrow</span>
                        </button>
                      )}
                      {vm.status === "Provisioning" && (
                        <button
                          disabled
                          className="p-1.5 rounded-lg border border-outline-variant text-outline-variant cursor-not-allowed opacity-50"
                          title="VM Provisioning"
                        >
                          <span className="material-symbols-outlined text-[18px] block animate-spin">sync</span>
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/vm/${vm.id}`)}
                        className="p-1.5 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-[18px] block">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Table Pagination */}
      <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
        <span className="text-secondary font-label-md text-label-md">
          Showing {totalItems === 0 ? 0 : startIndex + 1}-{endIndex} of {totalItems} VMs
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalItems === 0}
            className="px-3 py-1 border border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors font-label-md text-label-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalItems === 0}
            className="px-3 py-1 border border-outline-variant rounded-lg hover:bg-surface-container-highest transition-colors font-label-md text-label-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
