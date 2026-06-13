import { useParams, useNavigate, Link } from "react-router-dom";
import { useVM } from "../context/VMContext";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function VMDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vms, isLoading, startVM, stopVM, restartVM, deleteVM, resizeVM, archiveLogs } = useVM();

  const [showStopModal, setShowStopModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResizeModal, setShowResizeModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("logs");

  const [isDeleting, setIsDeleting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveBanner, setArchiveBanner] = useState(null);

  const [resizeCpu, setResizeCpu] = useState(2);
  const [resizeMemory, setResizeMemory] = useState(4);
  const [resizeDisk, setResizeDisk] = useState(32);

  // Find current VM
  const vm = vms.find((item) => item.id === id);

  // Sync form inputs when VM specs change
  useEffect(() => {
    if (vm) {
      setResizeCpu(parseInt(vm.cpu) || 2);
      setResizeMemory(parseInt(vm.memory) || 4);
      setResizeDisk(parseInt(vm.disk) || 32);
    }
  }, [vm]);

  // Redirect to dashboard if VM not found after loading finishes
  useEffect(() => {
    if (!isLoading && !vm) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [vm, isLoading, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-primary text-[48px] animate-spin">sync</span>
          <h2 className="font-headline-md text-headline-md text-primary mt-4">Loading VM Details...</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Connecting to Proxmox cluster...
          </p>
        </div>
      </MainLayout>
    );
  }

  if (!vm) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-error text-[48px] animate-bounce">warning</span>
          <h2 className="font-headline-md text-headline-md text-primary mt-4">Virtual Machine Not Found</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Redirecting to dashboard...
          </p>
        </div>
      </MainLayout>
    );
  }

  // Calculate memory percentage
  const memoryTotal = parseFloat(vm.memory);
  const memoryUsed = parseFloat(vm.memoryAllocated) || 0;
  const memoryPercent = memoryTotal > 0 ? Math.round((memoryUsed / memoryTotal) * 100) : 0;

  // Copy to clipboard handler
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStopImmediately = async () => {
    await stopVM(vm.id);
    setShowStopModal(false);
  };

  const handleDeleteImmediately = async () => {
    setIsDeleting(true);
    try {
      await deleteVM(vm.id);
      setShowDeleteModal(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete VM");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResizeSubmit = async (e) => {
    e.preventDefault();
    setIsResizing(true);
    try {
      await resizeVM(vm.id, {
        cpu: resizeCpu,
        memory: resizeMemory,
        disk: resizeDisk
      });
      setShowResizeModal(false);
      alert("VM specs updated successfully.");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to resize VM");
    } finally {
      setIsResizing(false);
    }
  };

  const handleArchiveLogs = async () => {
    setIsArchiving(true);
    try {
      const result = await archiveLogs(vm.id);
      setArchiveBanner(result.status || "Logs archived successfully");
      setTimeout(() => setArchiveBanner(null), 4000);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to archive logs");
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <MainLayout>
      {archiveBanner && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-500/30 text-emerald-800 rounded-lg flex items-center gap-2 animate-fade-in shadow-sm">
          <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
          <span className="font-body-md">{archiveBanner}</span>
        </div>
      )}
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-6 text-on-surface-variant">
        <Link to="/" className="font-body-sm text-body-sm hover:text-primary transition-colors">
          Dashboard
        </Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="font-body-sm text-body-sm font-semibold text-primary">{vm.name}</span>
      </nav>

      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-lg text-headline-lg text-primary">{vm.name}</h1>
          
          {/* Status Badge */}
          {vm.status === "Running" && (
            <span className="px-3 py-1 rounded-full bg-[#ecfdf5] text-[#047857] text-label-md font-label-md flex items-center gap-1.5 border border-[#10b981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Running
            </span>
          )}
          {vm.status === "Stopped" && (
            <span className="px-3 py-1 rounded-full bg-error-container/50 text-error text-label-md font-label-md flex items-center gap-1.5 border border-error/20">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              Stopped
            </span>
          )}
          {vm.status === "Provisioning" && (
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-label-md font-label-md flex items-center gap-1.5 border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Provisioning
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {vm.status === "Running" ? (
            <button
              onClick={() => setShowStopModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-outline text-primary font-body-md text-body-md rounded-lg hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">stop_circle</span>
              Stop
            </button>
          ) : vm.status === "Stopped" ? (
            <button
              onClick={() => startVM(vm.id)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-on-primary font-body-md text-body-md rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-md cursor-pointer focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              Start
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-outline-variant font-body-md text-body-md rounded-lg opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              Provisioning
            </button>
          )}

          <button
            onClick={() => {
              if (vm.status === "Provisioning") return;
              restartVM(vm.id);
            }}
            disabled={vm.status === "Provisioning"}
            className="flex items-center gap-2 px-4 py-2 border border-outline text-primary font-body-md text-body-md rounded-lg hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            Restart
          </button>

          <button
            onClick={() => alert(`Connecting terminal to console of VM: ${vm.name}...`)}
            disabled={vm.status !== "Running"}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-body-md text-body-md rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            Terminal
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-error text-error font-body-md text-body-md rounded-lg hover:bg-error-container/20 transition-all active:scale-95 cursor-pointer focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
            Delete
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        
        {/* Card 1: Resource Overview */}
        <section className="lg:col-span-8 bg-surface-container-lowest p-container-padding rounded border border-outline-variant card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-sm text-headline-sm text-primary">Resource Overview</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Real-time Stats
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CPU Usage */}
            <div className="p-4 rounded bg-surface-container-low border border-outline-variant/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">CPU Usage</span>
                <span className="font-label-md text-label-md text-primary font-bold">{vm.cpuUsage}</span>
              </div>
              
              {/* Dynamic Sparkline bars */}
              <div className="sparkline-container flex items-end gap-1 overflow-hidden h-12">
                {vm.cpuHistory.map((val, idx) => {
                  const isLast = idx === vm.cpuHistory.length - 1;
                  return (
                    <div
                      key={idx}
                      style={{ height: `${Math.max(4, val)}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        isLast ? "bg-primary" : "bg-secondary/40"
                      }`}
                      title={`CPU load: ${val}%`}
                    ></div>
                  );
                })}
              </div>
            </div>

            {/* Memory Gauge */}
            <div className="p-4 rounded bg-surface-container-low border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant">Memory Usage</span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {vm.memoryAllocated} / {vm.memory}
                </span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${memoryPercent}%` }}
                ></div>
              </div>
              <p className="font-body-sm text-body-sm mt-3 text-on-surface-variant">{memoryPercent}% allocated</p>
            </div>

            {/* Network Throughput */}
            <div className="p-4 rounded bg-surface-container-low border border-outline-variant/30">
              <div className="flex justify-between items-start mb-2">
                <span className="font-label-md text-label-md text-on-surface-variant">Network Out</span>
                <span className="font-label-md text-label-md text-primary font-bold">{vm.networkOut}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-secondary text-base">upload</span>
                <span className="font-label-md text-label-md">
                  {vm.status === "Running" ? "Active" : "Offline"}
                </span>
              </div>
              <p className="font-body-sm text-body-sm mt-4 text-on-surface-variant">
                {vm.totalTransfer} total transfer
              </p>
            </div>
          </div>

          {/* Load History Chart Container - Styled elegantly with SVG */}
          <div className="mt-8 bg-surface-container-low rounded p-4 border border-outline-variant/20 flex flex-col justify-between h-64 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <div className="flex justify-between items-center mb-2 z-10">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">CPU Performance Curve (24h)</span>
              <span className="font-label-sm text-label-sm text-secondary font-bold">AVG LOAD: 22%</span>
            </div>

            {/* SVG graph */}
            <div className="flex-1 w-full relative z-10 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#515f74" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#515f74" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal reference lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#e4e2e4" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#e4e2e4" strokeWidth="0.5" strokeDasharray="4,4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#e4e2e4" strokeWidth="0.5" strokeDasharray="4,4" />
                
                {/* Area path */}
                <path
                  d="M 0 120 L 0 80 Q 75 40 150 90 T 300 30 T 450 70 L 500 60 L 500 120 Z"
                  fill="url(#chart-grad)"
                />
                {/* Line path */}
                <path
                  d="M 0 80 Q 75 40 150 90 T 300 30 T 450 70 L 500 60"
                  fill="none"
                  stroke="#515f74"
                  strokeWidth="2"
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-surface-container-lowest/80 backdrop-blur px-4 py-2 rounded-full text-label-md font-label-md border border-outline-variant shadow-sm transition-transform group-hover:scale-105 duration-300">
                  Telemetry Active
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-[10px] text-on-surface-variant font-label-sm pt-2 border-t border-outline-variant/10 z-10">
              <span>24 Hours Ago</span>
              <span>12 Hours Ago</span>
              <span>Now</span>
            </div>
          </div>
        </section>

        {/* Card 2: Basic Information */}
        <section className="lg:col-span-4 bg-surface-container-lowest p-container-padding rounded border border-outline-variant card-shadow flex flex-col justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">VM ID</span>
                <div className="flex items-center justify-between group">
                  <span className="font-label-md text-label-md text-primary font-bold">{vm.id}</span>
                  <button
                    onClick={() => handleCopy(vm.id)}
                    className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                    title="Copy VM ID"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {copied ? "check" : "content_copy"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Operating System</span>
                <span className="font-body-md text-body-md text-primary">{vm.os}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Internal IP Address</span>
                <div className="flex items-center justify-between group">
                  <span className="font-label-md text-label-md text-primary font-bold">{vm.ip}</span>
                  <button
                    onClick={() => handleCopy(vm.ip)}
                    className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                    title="Copy IP Address"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      content_copy
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Provisioned</span>
                <span className="font-body-md text-body-md text-primary">{vm.provisioned}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant mt-6">
            <button
              onClick={() => alert(`Deployment Manifest YAML for ${vm.name}:\n\napiVersion: proxmox.com/v1alpha1\nkind: VirtualMachine\nmetadata:\n  name: ${vm.name}\n  id: ${vm.id}\nspec:\n  resources:\n    cores: ${vm.cpu}\n    memory: ${vm.memory}\n    storage: ${vm.disk}`)}
              className="w-full text-left flex items-center justify-between font-body-sm text-body-sm text-secondary font-semibold hover:text-primary transition-colors focus:outline-none"
            >
              View Deployment Manifest
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
        </section>

        {/* Card 3: Hardware Configuration */}
        <section className="lg:col-span-5 bg-surface-container-lowest p-container-padding rounded border border-outline-variant card-shadow flex flex-col justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Hardware Configuration</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-surface-container-low text-secondary">
                  <span className="material-symbols-outlined block">memory</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">vCPU</p>
                  <p className="font-headline-sm text-headline-sm text-primary">{vm.cpu}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-surface-container-low text-secondary">
                  <span className="material-symbols-outlined block">developer_board</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">RAM</p>
                  <p className="font-headline-sm text-headline-sm text-primary">{vm.memory}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-surface-container-low text-secondary">
                  <span className="material-symbols-outlined block">storage</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">SSD Storage</p>
                  <p className="font-headline-sm text-headline-sm text-primary">{vm.disk}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-surface-container-low text-secondary">
                  <span className="material-symbols-outlined block">location_on</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Node Zone</p>
                  <p className="font-body-md text-body-md text-primary font-semibold truncate">{vm.node}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowResizeModal(true)}
              className="w-full py-2.5 rounded border-2 border-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all cursor-pointer focus:outline-none"
            >
              Resize Instance
            </button>
          </div>
        </section>

        {/* Card 4: Recent Events / Logs */}
        <section className="lg:col-span-7 bg-surface-container-lowest p-container-padding rounded border border-outline-variant card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-sm text-headline-sm text-primary">Recent Events</h2>
              <button
                onClick={handleArchiveLogs}
                disabled={isArchiving}
                className="text-secondary hover:text-primary font-label-sm text-label-sm font-bold uppercase focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isArchiving ? "Archiving..." : "Archive Logs"}
              </button>
          </div>
          <div className="space-y-0 max-h-72 overflow-y-auto pr-1">
            {vm.logs.map((log, idx) => (
              <div
                key={idx}
                className="flex gap-4 py-3 border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors px-2 -mx-2 rounded"
              >
                <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 mt-1 w-16">
                  {log.time}
                </span>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-primary font-medium">{log.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{log.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Modal: Stop VM Confirmation */}
      {showStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0" onClick={() => setShowStopModal(false)}></div>
          <div className="relative bg-surface-container-lowest w-full max-w-md rounded shadow-2xl overflow-hidden border border-outline-variant transition-all transform scale-100 opacity-100 z-10">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[28px] block">warning</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">Stop Instance?</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Stopping <span className="font-bold text-primary">{vm.name}</span> will terminate all active database connections.
                This may cause service disruption for dependent applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 px-4 py-2 border border-outline text-primary font-body-md text-body-md rounded hover:bg-surface-container-low transition-colors cursor-pointer"
                  onClick={() => setShowStopModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-error text-on-error font-body-md text-body-md rounded hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer"
                  onClick={handleStopImmediately}
                >
                  Stop Immediately
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Modal: Delete VM Confirmation */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-overlay absolute inset-0" onClick={() => setShowDeleteModal(false)}></div>
            <div className="relative bg-surface-container-lowest w-full max-w-md rounded shadow-2xl overflow-hidden border border-outline-variant transition-all transform scale-100 opacity-100 z-10">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[28px] block">warning</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Delete Instance?</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Are you sure you want to permanently delete <span className="font-bold text-primary">{vm.name}</span>?
                  This action cannot be undone and will delete the VM from both Proxmox and the database.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 border border-outline text-primary font-body-md text-body-md rounded hover:bg-surface-container-low transition-colors cursor-pointer disabled:opacity-50"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 bg-error text-on-error font-body-md text-body-md rounded hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    onClick={handleDeleteImmediately}
                  >
                    {isDeleting ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                        Deleting...
                      </>
                    ) : (
                      "Delete Permanently"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Resize VM Instance */}
        {showResizeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="modal-overlay absolute inset-0" onClick={() => setShowResizeModal(false)}></div>
            <div className="relative bg-surface-container-lowest w-full max-w-lg rounded shadow-2xl overflow-hidden border border-outline-variant transition-all transform scale-100 opacity-100 z-10">
              <form onSubmit={handleResizeSubmit} className="p-6 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[28px] block">settings</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">Resize VM Instance</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Update hardware specs for {vm.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="resize-cpu">
                      CPU Cores
                    </label>
                    <div className="relative">
                      <input
                        id="resize-cpu"
                        value={resizeCpu}
                        onChange={(e) => setResizeCpu(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="128"
                        type="number"
                        className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest focus:outline-none"
                        required
                      />
                      <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">vCPU</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="resize-memory">
                      Memory
                    </label>
                    <div className="relative">
                      <input
                        id="resize-memory"
                        value={resizeMemory}
                        onChange={(e) => setResizeMemory(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="512"
                        type="number"
                        className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest focus:outline-none"
                        required
                      />
                      <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">GB</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="resize-disk">
                      Disk NVMe Size
                    </label>
                    <div className="relative">
                      <input
                        id="resize-disk"
                        value={resizeDisk}
                        onChange={(e) => setResizeDisk(Math.max(10, parseInt(e.target.value) || 10))}
                        min="10"
                        max="10000"
                        type="number"
                        className="w-full border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest focus:outline-none"
                        required
                      />
                      <span className="absolute right-4 top-2.5 font-label-sm text-on-surface-variant">GB</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    disabled={isResizing}
                    className="flex-1 px-4 py-2 border border-outline text-primary font-body-md text-body-md rounded hover:bg-surface-container-low transition-colors cursor-pointer disabled:opacity-50"
                    onClick={() => setShowResizeModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isResizing}
                    className="flex-1 px-4 py-2 bg-slate-950 text-on-primary font-body-md text-body-md rounded hover:opacity-90 transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isResizing ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                        Resizing...
                      </>
                    ) : (
                      "Apply Hardware Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </MainLayout>
  );
}
