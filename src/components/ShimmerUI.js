const ShimmerCard = () => (
  <div className="flex flex-col animate-pulse">
    {/* Thumbnail */}
    <div className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-[#1e1e2e]" />

    {/* Info — no avatar (matches new VideoCard design) */}
    <div className="mt-3 px-0.5 flex flex-col gap-2">
      <div className="h-3.5 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-full" />
      <div className="h-3.5 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-4/5" />
      <div className="flex items-center justify-between mt-0.5">
        <div className="h-3 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-1/3" />
        <div className="h-5 bg-gray-200 dark:bg-[#1e1e2e] rounded-full w-16" />
      </div>
    </div>
  </div>
);

const ShimmerUI = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 px-4 py-6 sm:px-6">
    {Array(16).fill("").map((_, i) => <ShimmerCard key={i} />)}
  </div>
);

export default ShimmerUI;
