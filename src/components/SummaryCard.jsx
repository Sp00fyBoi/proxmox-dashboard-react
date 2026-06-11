export default function SummaryCard({ title, value, type }) {
  const config = {
    total: {
      textColor: "text-primary",
      iconColor: "text-primary",
      icon: "desktop_windows",
      bg: "bg-surface-container-low",
      fill: false
    },
    running: {
      textColor: "text-emerald-600",
      iconColor: "text-emerald-600",
      icon: "play_circle",
      bg: "bg-emerald-50",
      fill: true
    },
    stopped: {
      textColor: "text-error",
      iconColor: "text-error",
      icon: "stop_circle",
      bg: "bg-error-container/30",
      fill: true
    }
  };

  const cardConfig = config[type] || config.total;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 custom-shadow flex items-center justify-between">
      <div>
        <p className="font-label-md text-label-md text-secondary uppercase tracking-wider">
          {title}
        </p>
        <p className={`font-headline-lg text-headline-lg mt-1 ${cardConfig.textColor}`}>
          {value}
        </p>
      </div>

      <div className={`${cardConfig.bg} p-3 rounded-xl`}>
        <span
          className={`material-symbols-outlined ${cardConfig.iconColor} text-[32px] block`}
          style={cardConfig.fill ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {cardConfig.icon}
        </span>
      </div>
    </div>
  );
}
