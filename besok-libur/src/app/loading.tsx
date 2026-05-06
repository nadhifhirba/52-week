export default function Loading() {
  return (
    <div className="space-y-6 pb-10">
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-6 shadow-[10px_10px_0_0_rgba(255,107,0,0.16)] sm:p-8">
        <div className="h-6 w-40 rounded-full shimmer" />
        <div className="mt-5 h-14 w-full max-w-3xl rounded-2xl shimmer" />
        <div className="mt-4 h-6 w-full max-w-2xl rounded-full shimmer" />
        <div className="mt-8 flex flex-wrap gap-3">
          <div className="h-10 w-28 rounded-full shimmer" />
          <div className="h-10 w-24 rounded-full shimmer" />
          <div className="h-10 w-32 rounded-full shimmer" />
          <div className="h-10 w-20 rounded-full shimmer" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-900/80 shadow-[8px_8px_0_0_rgba(255,107,0,0.16)]">
            <div className="h-52 shimmer" />
            <div className="space-y-3 p-5">
              <div className="h-6 w-2/3 rounded-full shimmer" />
              <div className="h-4 w-full rounded-full shimmer" />
              <div className="h-4 w-5/6 rounded-full shimmer" />
              <div className="mt-4 h-10 w-28 rounded-full shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
