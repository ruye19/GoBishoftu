export function SkeletonAttraction() {
  return (
    <div className="bg-card rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        {/* Image Skeleton */}
        <div className="w-full h-48 bg-muted/30 rounded-t-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Location and Rating Skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-muted/20 rounded-full" />
          <div className="h-4 w-12 bg-muted/20 rounded-full" />
        </div>
        
        {/* Title Skeleton */}
        <div className="h-5 w-3/4 bg-muted/20 rounded-lg" />
        
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted/20 rounded" />
          <div className="h-3 w-full bg-muted/20 rounded" />
          <div className="h-3 w-2/3 bg-muted/20 rounded" />
        </div>
      </div>
    </div>
  );
}
