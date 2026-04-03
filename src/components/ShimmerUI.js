const ShimmerCard = () => (
  <div className="flex flex-col">
    {/* Thumbnail — 16:9 */}
    <div className="shimmer-bg w-full aspect-video rounded-xl" />

    {/* Info row */}
    <div className="flex gap-3 mt-3">
      {/* Channel avatar */}
      <div className="shimmer-bg flex-shrink-0 w-9 h-9 rounded-full" />

      {/* Text block */}
      <div className="flex flex-col gap-2 flex-1 mt-0.5">
        {/* Title line 1 */}
        <div className="shimmer-bg h-4 rounded-sm w-full" />
        {/* Title line 2 — shorter like YouTube */}
        <div className="shimmer-bg h-4 rounded-sm w-5/6" />
        {/* Channel name */}
        <div className="shimmer-bg h-3.5 rounded-sm w-1/2 mt-0.5" />
        {/* Views + time */}
        <div className="shimmer-bg h-3.5 rounded-sm w-2/5" />
      </div>
    </div>
  </div>
);

const ShimmerUI = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 px-3 py-4 sm:px-4 sm:py-6">
    {Array(20)
      .fill("")
      .map((_, i) => (
        <ShimmerCard key={i} />
      ))}
  </div>
);

export default ShimmerUI;
