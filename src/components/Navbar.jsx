import { NavLink } from "react-router-dom";
import { useVM } from "../context/VMContext";
import { useState } from "react";

export default function Navbar() {
  const { triggerRefresh } = useVM();
  const [refreshing, setRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    triggerRefresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-body-md text-body-md text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1"
      : "font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-2 py-1 rounded-sm";

  return (
    <nav className="w-full top-0 sticky bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline shadow-sm z-50 flex justify-between items-center px-container-padding h-16">
      <div className="flex items-center gap-8">
        <NavLink to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
          VM Manager
        </NavLink>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            Create VM
          </NavLink>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Storage management coming soon!"); }}
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-2 py-1 rounded-sm"
          >
            Storage
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Network configuration coming soon!"); }}
            className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors px-2 py-1 rounded-sm"
          >
            Network
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={handleRefresh}
          className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 transition-transform"
          title="Refresh metrics"
        >
          <span className={`material-symbols-outlined text-on-surface-variant block ${refreshing ? "animate-spin" : ""}`}>
            refresh
          </span>
        </button>

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 transition-transform relative"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-on-surface-variant block">
            notifications
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {showNotifications && (
          <div className="absolute right-12 top-12 w-64 bg-surface-container-lowest border border-outline-variant rounded-lg card-shadow p-4 z-50">
            <h4 className="font-label-md text-label-md text-primary uppercase mb-2">Notifications</h4>
            <div className="space-y-2">
              <div className="text-body-sm font-body-sm text-on-surface">
                <span className="font-bold">Backup check:</span> Daily snapshot completed.
              </div>
              <div className="text-body-sm font-body-sm text-on-surface-variant">
                <span className="font-bold text-emerald-600">Health:</span> All nodes active.
              </div>
            </div>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant active:scale-95 transition-transform cursor-pointer">
          <img
            alt="Administrator Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyaNXn6umpqdJlwskoFyiuBcxdkdC0IfpB-u3NIPkchx3YCF6lQUPIPxUg6IE_RyPMAp5RGUnCJRUbDauhlJT6h2OCmSwoG6JXHiNlPYdIQGoPJo-ikdOO8mspdhCRj6ClpwhpxZuj-mdrApiPoP3-NTzdKsDSBNm3yBbFIvGU2Q1UhL9x14mqvo_rGpWRE5RTFDbFuDUTbxfwsOiS2AFQQ2deovO6wIOV-wwjHY0zVhZudM6jOXtFWqdwlwgnf6tpaL1zlTCX_YE"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
