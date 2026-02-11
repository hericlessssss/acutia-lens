export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-[4/3] bg-muted animate-shimmer" style={{
            backgroundImage: 'linear-gradient(90deg, transparent 0%, hsl(220,15%,20%) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }} />
          <div className="p-3 space-y-2">
            <div className="h-4 w-20 rounded bg-muted animate-shimmer" style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, hsl(220,15%,20%) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }} />
            <div className="h-3 w-32 rounded bg-muted animate-shimmer" style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, hsl(220,15%,20%) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}
