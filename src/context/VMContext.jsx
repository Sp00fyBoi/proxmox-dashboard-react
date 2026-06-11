import { createContext, useState, useContext } from "react";

const VMContext = createContext();

const initialVMs = [
  {
    id: "vm-82910",
    name: "prod-db-master-01",
    status: "Running",
    cpu: "8 vCPU",
    memory: "16 GB",
    disk: "250 GB",
    node: "us-east-1a-node-04",
    ip: "10.0.4.15",
    os: "Ubuntu 22.04 LTS",
    provisioned: "12 days ago",
    cpuUsage: "14.2%",
    memoryAllocated: "6.4",
    networkOut: "1.2 MB/s",
    totalTransfer: "842 GB",
    cpuHistory: [20, 35, 15, 45, 60, 30, 25, 14],
    logs: [
      { time: "10:42 AM", title: "User started VM", desc: "Initiated by admin@company.com" },
      { time: "09:15 AM", title: "System health check passed", desc: "All services reporting healthy. 0 errors found." },
      { time: "04:30 AM", title: "Daily Backup Completed", desc: "Snapshot snap-93021 created successfully." },
      { time: "Yesterday", title: "Network interface re-optimized", desc: "Automatic routing table update applied." }
    ]
  },
  {
    id: "vm-82911",
    name: "staging-redis-cache",
    status: "Running",
    cpu: "2 vCPU",
    memory: "4 GB",
    disk: "64 GB",
    node: "us-east-1b-node-12",
    ip: "10.0.4.16",
    os: "Ubuntu 22.04 LTS",
    provisioned: "5 days ago",
    cpuUsage: "4.8%",
    memoryAllocated: "1.2",
    networkOut: "0.1 MB/s",
    totalTransfer: "112 GB",
    cpuHistory: [10, 12, 8, 15, 20, 14, 11, 5],
    logs: [
      { time: "08:00 AM", title: "System reboot completed", desc: "Scheduled patch update applied." },
      { time: "04:00 AM", title: "Daily Backup Completed", desc: "Snapshot snap-93022 created successfully." }
    ]
  },
  {
    id: "vm-82912",
    name: "dev-worker-instance",
    status: "Stopped",
    cpu: "4 vCPU",
    memory: "8 GB",
    disk: "120 GB",
    node: "us-west-2a-node-01",
    ip: "10.0.8.22",
    os: "Debian 11",
    provisioned: "1 month ago",
    cpuUsage: "0%",
    memoryAllocated: "0",
    networkOut: "0 MB/s",
    totalTransfer: "34 GB",
    cpuHistory: [0, 0, 0, 0, 0, 0, 0, 0],
    logs: [
      { time: "3 days ago", title: "User stopped VM", desc: "Initiated by dev-team@company.com" },
      { time: "4 days ago", title: "High memory alert", desc: "Memory consumption reached 92%." }
    ]
  },
  {
    id: "vm-82913",
    name: "prod-api-gateway",
    status: "Running",
    cpu: "4 vCPU",
    memory: "8 GB",
    disk: "100 GB",
    node: "us-east-1a-node-04",
    ip: "10.0.4.10",
    os: "CentOS Stream 9",
    provisioned: "20 days ago",
    cpuUsage: "22.5%",
    memoryAllocated: "4.8",
    networkOut: "2.4 MB/s",
    totalTransfer: "1.2 TB",
    cpuHistory: [15, 18, 25, 22, 30, 28, 20, 23],
    logs: [
      { time: "11:15 AM", title: "Network routing optimized", desc: "Internal gateway link latency adjusted." }
    ]
  }
];

export function VMProvider({ children }) {
  const [vms, setVms] = useState(initialVMs);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const triggerRefresh = () => {
    setVms((prevVms) =>
      prevVms.map((vm) => {
        if (vm.status !== "Running") return vm;
        const newCpu = (Math.random() * 40 + 5).toFixed(1);
        const newRam = (parseFloat(vm.memory) * (Math.random() * 0.4 + 0.2)).toFixed(1);
        const newNet = (Math.random() * 3.5 + 0.1).toFixed(1);
        const historyCopy = [...vm.cpuHistory.slice(1), Math.round(newCpu)];

        return {
          ...vm,
          cpuUsage: `${newCpu}%`,
          memoryAllocated: newRam,
          networkOut: `${newNet} MB/s`,
          cpuHistory: historyCopy
        };
      })
    );
    const now = new Date();
    setLastUpdated(`At ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  const startVM = (id) => {
    setVms((prevVms) =>
      prevVms.map((vm) => {
        if (vm.id !== id) return vm;
        const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return {
          ...vm,
          status: "Running",
          cpuUsage: "12.0%",
          memoryAllocated: (parseFloat(vm.memory) * 0.3).toFixed(1),
          networkOut: "0.5 MB/s",
          cpuHistory: [5, 8, 10, 12, 11, 14, 15, 12],
          logs: [
            { time: timeStr, title: "User started VM", desc: "Initiated by administrator" },
            ...vm.logs
          ]
        };
      })
    );
  };

  const stopVM = (id) => {
    setVms((prevVms) =>
      prevVms.map((vm) => {
        if (vm.id !== id) return vm;
        const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return {
          ...vm,
          status: "Stopped",
          cpuUsage: "0%",
          memoryAllocated: "0",
          networkOut: "0 MB/s",
          cpuHistory: [0, 0, 0, 0, 0, 0, 0, 0],
          logs: [
            { time: timeStr, title: "User stopped VM", desc: "Terminated active databases and services" },
            ...vm.logs
          ]
        };
      })
    );
  };

  const restartVM = (id) => {
    setVms((prevVms) =>
      prevVms.map((vm) => {
        if (vm.id !== id) return vm;
        const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return {
          ...vm,
          status: "Provisioning",
          cpuUsage: "0.5%",
          memoryAllocated: "0.2",
          cpuHistory: [0, 0, 0, 0, 0, 0, 0, 0],
          logs: [
            { time: timeStr, title: "System reboot initiated", desc: "Warm restart instruction received" },
            ...vm.logs
          ]
        };
      })
    );

    // Mock completion of provisioning after 3 seconds
    setTimeout(() => {
      setVms((prevVms) =>
        prevVms.map((vm) => {
          if (vm.id !== id) return vm;
          if (vm.status !== "Provisioning") return vm; // if stopped in between
          const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return {
            ...vm,
            status: "Running",
            cpuUsage: "10.0%",
            memoryAllocated: (parseFloat(vm.memory) * 0.25).toFixed(1),
            networkOut: "0.2 MB/s",
            cpuHistory: [0, 0, 2, 5, 8, 12, 10, 10],
            logs: [
              { time: timeStr, title: "VM online", desc: "System boot completed, guest agent connected." },
              ...vm.logs
            ]
          };
        })
      );
    }, 3000);
  };

  const createVM = (newVMData) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const formattedId = newVMData.id.startsWith("vm-") ? newVMData.id : `vm-${newVMData.id}`;
    
    // Choose standard node based on OS or count
    const node = newVMData.id % 2 === 0 ? "us-east-1a-node-04" : "us-west-2a-node-01";
    const ip = `10.0.${Math.floor(Math.random() * 12) + 2}.${Math.floor(Math.random() * 254) + 1}`;

    const newVM = {
      id: formattedId,
      name: newVMData.name,
      status: "Running",
      cpu: `${newVMData.cpu} vCPU`,
      memory: `${newVMData.memory} GB`,
      disk: `${newVMData.disk} GB`,
      node: node,
      ip: ip,
      os: newVMData.os === "ubuntu-22" ? "Ubuntu 22.04 LTS" : newVMData.os === "debian-11" ? "Debian 11" : "CentOS Stream 9",
      provisioned: "Just now",
      cpuUsage: "15.0%",
      memoryAllocated: (parseFloat(newVMData.memory) * 0.2).toFixed(1),
      networkOut: "0.1 MB/s",
      totalTransfer: "0 GB",
      cpuHistory: [0, 0, 0, 0, 5, 10, 15, 15],
      logs: [
        { time: timeStr, title: "Instance Provisioned", desc: "VM deployment completed successfully." }
      ]
    };

    setVms((prevVms) => [...prevVms, newVM]);
  };

  return (
    <VMContext.Provider
      value={{
        vms,
        lastUpdated,
        triggerRefresh,
        startVM,
        stopVM,
        restartVM,
        createVM
      }}
    >
      {children}
    </VMContext.Provider>
  );
}

export function useVM() {
  const context = useContext(VMContext);
  if (!context) {
    throw new Error("useVM must be used within a VMProvider");
  }
  return context;
}
