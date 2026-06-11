import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVM } from "../context/VMContext";
import MainLayout from "../layouts/MainLayout";

export default function CreateVM() {
  const navigate = useNavigate();
  const { createVM, vms } = useVM();

  // Form states
  const [vmName, setVmName] = useState("");
  const [vmId, setVmId] = useState("");
  const [os, setOs] = useState("ubuntu-22");
  const [cpu, setCpu] = useState(2);
  const [memory, setMemory] = useState(4);
  const [disk, setDisk] = useState(32);

  // Interaction and submit states
  const [isDeploying, setIsDeploying] = useState(false);
  const [highlightId, setHighlightId] = useState(false);
  const [cost, setCost] = useState(12.4);

  // Dynamic cost calculation
  useEffect(() => {
    const baseCost = 5.0;
    const computedCost = baseCost + cpu * 2.5 + memory * 0.5 + disk * 0.05;
    setCost(parseFloat(computedCost.toFixed(2)));
  }, [cpu, memory, disk]);

  // Generate ID handler
  const generateId = () => {
    // Generate a random 3-digit VM ID that doesn't exist
    let randomId;
    let exists = true;
    while (exists) {
      randomId = Math.floor(100 + Math.random() * 900);
      exists = vms.some((vm) => vm.id === `vm-${randomId}`);
    }
    setVmId(randomId.toString());
    setHighlightId(true);
    setTimeout(() => setHighlightId(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vmName.trim()) {
      alert("Please enter a VM Name.");
      return;
    }
    if (!vmId.trim() || isNaN(vmId)) {
      alert("Please enter a valid numeric VM ID.");
      return;
    }
    if (vms.some((vm) => vm.id === `vm-${vmId}` || vm.id === vmId)) {
      alert("This VM ID is already in use. Please select a unique ID.");
      return;
    }

    setIsDeploying(true);

    setTimeout(() => {
      createVM({
        name: vmName,
        id: vmId,
        os,
        cpu,
        memory,
        disk,
      });
      alert("VM Creation request queued successfully.");
      setIsDeploying(false);
      navigate("/");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-6 w-full">
        {/* Header Section */}
        <div className="w-full max-w-2xl mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Create Virtual Machine</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Configure and deploy a new cloud instance to your infrastructure cluster.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-lg border border-outline-variant card-shadow p-container-padding">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Info Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gutter">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="vm-name">
                  VM Name
                </label>
                <input
                  id="vm-name"
                  value={vmName}
                  onChange={(e) => setVmName(e.target.value)}
                  className="border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-lowest focus:outline-none"
                  placeholder="e.g. production-api-01"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="vm-id">
                  VM ID
                </label>
                <div className="relative group">
                  <input
                    id="vm-id"
                    value={vmId}
                    onChange={(e) => setVmId(e.target.value)}
                    className={`w-full border border-outline-variant rounded-lg px-4 py-2 font-label-md text-label-md focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-12 bg-surface-container-lowest focus:outline-none ${
                      highlightId ? "bg-secondary-container" : ""
                    }`}
                    placeholder="100"
                    type="text"
                  />
                  <button
                    onClick={generateId}
                    title="Auto-generate ID"
                    type="button"
                    className="absolute right-2 top-1.5 p-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[20px] block">magic_button</span>
                  </button>
                </div>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-label-sm">
                  Unique numerical identifier
                </span>
              </div>
            </div>

            {/* OS Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="os">
                Operating System
              </label>
              <div className="relative">
                <select
                  id="os"
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-lowest cursor-pointer focus:outline-none"
                >
                  <option value="ubuntu-22">Ubuntu 22.04 LTS</option>
                  <option value="debian-11">Debian 11</option>
                  <option value="centos-9">CentOS Stream 9</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-on-surface-variant">
                  expand_more
                </span>
              </div>
            </div>

            {/* Resource Allocation Grid */}
            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant space-y-6">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-2">
                Resource Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gutter">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="cpu-cores">
                    CPU Cores
                  </label>
                  <div className="relative">
                    <input
                      id="cpu-cores"
                      value={cpu}
                      onChange={(e) => setCpu(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="128"
                      type="number"
                      className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-lowest focus:outline-none"
                    />
                    <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">vCPU</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="memory">
                    Memory
                  </label>
                  <div className="relative">
                    <input
                      id="memory"
                      value={memory}
                      onChange={(e) => setMemory(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="512"
                      type="number"
                      className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-lowest focus:outline-none"
                    />
                    <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">GB</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="disk-size">
                  Disk Size
                </label>
                <div className="relative">
                  <input
                    id="disk-size"
                    value={disk}
                    onChange={(e) => setDisk(Math.max(10, parseInt(e.target.value) || 10))}
                    min="10"
                    max="10000"
                    type="number"
                    className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-surface-container-lowest focus:outline-none"
                  />
                  <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">GB NVMe</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="px-6 py-2 border border-primary rounded-lg text-primary font-body-md font-medium hover:bg-surface-container-high transition-all active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDeploying}
                className="px-8 py-2 bg-slate-950 text-on-primary rounded-lg font-body-md font-medium hover:opacity-90 transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isDeploying ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                    Deploying...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    Create Instance
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* System Stats Preview */}
        <div className="w-full max-w-2xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
          <div className="col-span-1 p-4 bg-secondary-container rounded-lg border border-outline-variant">
            <span className="block font-label-sm text-on-secondary-container uppercase mb-1">Available Quota</span>
            <span className="text-headline-sm font-bold text-on-secondary-container">
              {Math.max(0, 100 - vms.length * 4)}%
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant card-shadow flex items-center justify-between">
            <div>
              <span className="block font-label-sm text-on-surface-variant uppercase mb-1">Infrastructure Load</span>
              <div className="flex gap-2 items-end">
                <div className="w-2 h-4 bg-surface-variant rounded-sm"></div>
                <div className="w-2 h-6 bg-surface-variant rounded-sm"></div>
                <div className="w-2 h-3 bg-surface-variant rounded-sm"></div>
                <div className="w-2 h-8 bg-primary rounded-sm"></div>
                <div className="w-2 h-5 bg-surface-variant rounded-sm"></div>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-label-sm text-on-surface-variant uppercase">Estimated Cost</span>
              <span className="text-body-lg font-bold text-on-surface">
                ${cost.toFixed(2)}
                <span className="text-sm font-normal text-on-surface-variant">/mo</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
