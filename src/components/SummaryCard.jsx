export default function SummaryCard({ title, value, type }) {
  const config = {
    total: {
      color: "text-black",
      icon: "desktop_windows",
      bg: "bg-gray-100"
    },
    running: {
      color: "text-emerald-600",
      icon: "play_circle",
      bg: "bg-emerald-50"
    },
    stopped: {
      color: "text-red-600",
      icon: "stop_circle",
      bg: "bg-red-100"
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${config[type].color}`}>
          {value}
        </p>
      </div>

      <div className={`${config[type].bg} p-3 rounded-xl`}>
        <span className="material-symbols-outlined text-3xl">
          {config[type].icon}
        </span>
      </div>
    </div>
  );
}
