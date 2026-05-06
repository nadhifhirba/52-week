export default function Loading() {
  return (
    <div className="space-y-8 pb-10">
      <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/80 shadow-[10px_10px_0_0_rgba(255,107,0,0.16)]">
        <div className="h-[360px] shimmer" />
        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded-full shimmer" />
            <div className="h-16 w-full rounded-2xl shimmer" />
            <div className="h-5 w-4/5 rounded-full shimmer" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-[1.25rem] shimmer" />
              <div className="h-24 rounded-[1.25rem] shimmer" />
              <div className="h-24 rounded-[1.25rem] shimmer" />
              <div className="h-24 rounded-[1.25rem] shimmer" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-52 rounded-[1.5rem] shimmer" />
            <div className="h-36 rounded-[1.5rem] shimmer" />
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 shadow-[8px_8px_0_0_rgba(255,107,0,0.16)]">
            <div className="h-48 shimmer" />
            <div className="space-y-3 p-5">
              <div className="h-6 w-2/3 rounded-full shimmer" />
              <div className="h-4 w-full rounded-full shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
