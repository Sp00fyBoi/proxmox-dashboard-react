import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import SearchBar from "../components/SearchBar";
import VMTable from "../components/VMTable";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const vms = [
    {
      id: "vm-82910",
      name: "prod-db-master-01",
      status: "Running",
      cpu: "8 vCPU",
      memory: "16 GB",
      node: "us-east-1a-node-04",
    },
    {
      id: "vm-82911",
      name: "staging-redis-cache",
      status: "Running",
      cpu: "2 vCPU",
      memory: "4 GB",
      node: "us-east-1b-node-12",
    },
    {
      id: "vm-82912",
      name: "dev-worker-instance",
      status: "Stopped",
      cpu: "4 vCPU",
      memory: "8 GB",
      node: "us-west-2a-node-01",
    },
  ];

  const filtered = vms.filter(
    (vm) =>
      vm.name.toLowerCase().includes(search.toLowerCase()) ||
      vm.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Manage and monitor your virtual machines
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="material-symbols-outlined text-base">
            schedule
          </span>
          Last updated: 2 mins ago
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <SummaryCard title="Total VMs" value="24" type="total" />
        <SummaryCard title="Running VMs" value="18" type="running" />
        <SummaryCard title="Stopped VMs" value="6" type="stopped" />
      </div>

      {/* Controls */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Table */}
      <VMTable data={filtered} />

    </MainLayout>
  );
}
