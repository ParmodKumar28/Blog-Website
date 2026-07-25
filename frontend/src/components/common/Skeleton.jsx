// Single Grid Card Skeleton
export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden flex flex-col justify-between animate-pulse">
      <div>
        {/* Cover Image Placeholder */}
        <div className="aspect-[16/9] bg-zinc-200/80 w-full" />

        <div className="p-5 space-y-3">
          {/* Category Pill Placeholder */}
          <div className="w-16 h-4 bg-zinc-200/80 rounded-md" />

          {/* Title Lines */}
          <div className="space-y-2 pt-1">
            <div className="w-full h-5 bg-zinc-200/80 rounded-md" />
            <div className="w-3/4 h-5 bg-zinc-200/80 rounded-md" />
          </div>

          {/* Subtitle Lines */}
          <div className="space-y-1.5 pt-2">
            <div className="w-full h-3.5 bg-zinc-200/60 rounded-md" />
            <div className="w-5/6 h-3.5 bg-zinc-200/60 rounded-md" />
          </div>
        </div>
      </div>

      {/* Footer Byline */}
      <div className="px-5 pb-4 pt-3 flex items-center justify-between border-t border-zinc-100 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-zinc-200/80" />
          <div className="w-20 h-3 bg-zinc-200/80 rounded-md" />
        </div>
        <div className="w-14 h-3 bg-zinc-200/60 rounded-md" />
      </div>
    </div>
  );
};

// Featured Hero Article Skeleton
export const FeaturedHeroSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Hero Image Block */}
        <div className="md:col-span-7 aspect-[16/10] md:aspect-auto bg-zinc-200/80 min-h-[280px]" />

        {/* Hero Content Block */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-20 h-5 bg-zinc-200/80 rounded-md" />
              <div className="w-16 h-4 bg-zinc-200/60 rounded-md" />
            </div>
            
            <div className="space-y-2 pt-1">
              <div className="w-full h-7 bg-zinc-200/80 rounded-md" />
              <div className="w-full h-7 bg-zinc-200/80 rounded-md" />
              <div className="w-2/3 h-7 bg-zinc-200/80 rounded-md" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="w-full h-4 bg-zinc-200/60 rounded-md" />
              <div className="w-full h-4 bg-zinc-200/60 rounded-md" />
              <div className="w-4/5 h-4 bg-zinc-200/60 rounded-md" />
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-200/80" />
              <div className="w-24 h-4 bg-zinc-200/80 rounded-md" />
            </div>
            <div className="w-20 h-4 bg-zinc-200/80 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Full Article Detail Skeleton Reader
export const ArticleDetailSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse py-10 px-4 sm:px-6">
      {/* Top Header Navigation */}
      <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
        <div className="w-28 h-4 bg-zinc-200/80 rounded-md" />
      </div>

      {/* Header Lines */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-16 h-5 bg-zinc-200/80 rounded-md" />
          <div className="w-20 h-4 bg-zinc-200/60 rounded-md" />
        </div>

        <div className="space-y-3 pt-2">
          <div className="w-full h-10 bg-zinc-200/80 rounded-md" />
          <div className="w-3/4 h-10 bg-zinc-200/80 rounded-md" />
        </div>

        <div className="w-2/3 h-6 bg-zinc-200/60 rounded-md pt-2" />

        {/* Byline */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
          <div className="w-9 h-9 rounded-full bg-zinc-200/80" />
          <div className="space-y-1.5">
            <div className="w-28 h-4 bg-zinc-200/80 rounded-md" />
            <div className="w-36 h-3 bg-zinc-200/60 rounded-md" />
          </div>
        </div>
      </div>

      {/* Image Banner */}
      <div className="w-full h-72 sm:h-96 rounded-xl bg-zinc-200/80" />

      {/* Article Text Paragraph Skeletons */}
      <div className="space-y-4 pt-4">
        <div className="w-full h-4 bg-zinc-200/70 rounded-md" />
        <div className="w-full h-4 bg-zinc-200/70 rounded-md" />
        <div className="w-11/12 h-4 bg-zinc-200/70 rounded-md" />
        <div className="w-4/5 h-4 bg-zinc-200/70 rounded-md" />

        <div className="pt-4 space-y-3">
          <div className="w-full h-4 bg-zinc-200/70 rounded-md" />
          <div className="w-full h-4 bg-zinc-200/70 rounded-md" />
          <div className="w-9/12 h-4 bg-zinc-200/70 rounded-md" />
        </div>
      </div>
    </div>
  );
};

// Profile Dashboard Skeleton
export const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse py-10 px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-200/80 flex-shrink-0" />
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="w-24 h-4 bg-zinc-200/80 rounded-md mx-auto sm:mx-0" />
            <div className="w-48 h-8 bg-zinc-200/80 rounded-md mx-auto sm:mx-0" />
            <div className="w-64 h-4 bg-zinc-200/60 rounded-md mx-auto sm:mx-0" />
          </div>
        </div>
      </div>

      {/* Story List Skeletons */}
      <div className="space-y-4 pt-4">
        <div className="w-48 h-6 bg-zinc-200/80 rounded-md border-b border-zinc-200 pb-2" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-xl border border-zinc-200 p-5 flex gap-4 h-32">
            <div className="w-36 bg-zinc-200/80 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="w-3/4 h-5 bg-zinc-200/80 rounded-md" />
              <div className="w-full h-4 bg-zinc-200/60 rounded-md" />
              <div className="w-1/2 h-3 bg-zinc-200/60 rounded-md pt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
