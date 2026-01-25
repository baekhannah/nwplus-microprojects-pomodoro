interface SessionIndicatorProps {
  totalSessions: number;
  completedSessions: number;
  sessionsUntilLongBreak: number;
}

export function SessionIndicator({
  completedSessions,
  sessionsUntilLongBreak,
}: SessionIndicatorProps) {
  const sessionsInCurrentCycle = completedSessions % sessionsUntilLongBreak;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs text-gray-500 uppercase tracking-wide">Progress</span>
      <div className="flex items-center gap-2">
        {Array.from({ length: sessionsUntilLongBreak }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-colors ${
              index < sessionsInCurrentCycle
                ? 'bg-green-500'
                : 'bg-green-100'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {sessionsInCurrentCycle} / {sessionsUntilLongBreak} until long break
      </span>
    </div>
  );
}
