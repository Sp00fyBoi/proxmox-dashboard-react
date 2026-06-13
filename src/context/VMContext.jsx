import { createContext, useState, useContext, useEffect } from "react";

const VMContext = createContext();
const BASE_URL = "http://127.0.0.1:8000";

export function VMProvider({ children }) {
  const [vms, setVms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("Never");

  const fetchVMs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/`, {
        headers: {
          "Accept": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch VMs from cluster");
      const data = await res.json();
      setVms(data);
      const now = new Date();
      setLastUpdated(`At ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      await fetchVMs();
      setIsLoading(false);
    };
    initFetch();
  }, []);

  const triggerRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/vms/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to refresh metrics");
      await fetchVMs();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startVM = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/start/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to start VM");
      }
      const updatedVM = await res.json();
      setVms((prev) => prev.map((vm) => (vm.id === id ? updatedVM : vm)));
      return updatedVM;
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    }
  };

  const stopVM = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/stop/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to stop VM");
      }
      const updatedVM = await res.json();
      setVms((prev) => prev.map((vm) => (vm.id === id ? updatedVM : vm)));
      return updatedVM;
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    }
  };

  const restartVM = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/restart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to restart VM");
      }
      const updatedVM = await res.json();
      setVms((prev) => prev.map((vm) => (vm.id === id ? updatedVM : vm)));
      return updatedVM;
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    }
  };

  const createVM = async (newVMData) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          raw_id: String(newVMData.id),
          name: newVMData.name,
          os: newVMData.os,
          cpu: Number(newVMData.cpu),
          memory: Number(newVMData.memory),
          disk: Number(newVMData.disk),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || JSON.stringify(data) || "Failed to create VM");
      }
      const created = await res.json();
      setVms((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteVM = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete VM");
      }
      setVms((prev) => prev.filter((vm) => vm.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    }
  };

  const resizeVM = async (id, specs) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/resize/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          cpu: specs.cpu ? Number(specs.cpu) : undefined,
          memory: specs.memory ? Number(specs.memory) : undefined,
          disk: specs.disk ? Number(specs.disk) : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to resize VM");
      }
      const updatedVM = await res.json();
      setVms((prev) => prev.map((vm) => (vm.id === id ? updatedVM : vm)));
      return updatedVM;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const archiveLogs = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/vms/${id}/logs/archive/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.status || "Failed to archive logs");
      }
      const result = await res.json();
      await fetchVMs();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <VMContext.Provider
      value={{
        vms,
        isLoading,
        error,
        lastUpdated,
        triggerRefresh,
        startVM,
        stopVM,
        restartVM,
        createVM,
        deleteVM,
        resizeVM,
        archiveLogs
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
