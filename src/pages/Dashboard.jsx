import { useState } from "react";
import { useVM } from "../context/VMContext";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import SearchBar from "../components/SearchBar";
import VMTable from "../components/VMTable";

export default function Dashboard() {
  const { vms, lastUpdated, triggerRefresh } = useVM();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Summary Metrics Calculation
  const totalVMs = vms.length;
  const runningVMs = vms.filter((vm) => vm.status === "Running").length;
  const stoppedVMs = vms.filter((vm) => vm.status === "Stopped").length;

  // Filter VMs
  const filteredVMs = vms.filter((vm) => {
    const matchesSearch =
      vm.name.toLowerCase().includes(search.toLowerCase()) ||
      vm.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || vm.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Dashboard</h1>
          <p className="text-secondary font-body-lg text-body-lg">Manage and monitor your virtual machines</p>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant/60 font-label-md text-label-md">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>Last updated: {lastUpdated}</span>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        <SummaryCard title="Total VMs" value={totalVMs} type="total" />
        <SummaryCard title="Running VMs" value={runningVMs} type="running" />
        <SummaryCard title="Stopped VMs" value={stoppedVMs} type="stopped" />
      </section>

      {/* Controls Section */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onRefresh={triggerRefresh}
      />

      {/* VM List Table */}
      <VMTable data={filteredVMs} />
    </MainLayout>
  );
}
