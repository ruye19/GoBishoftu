export function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        {/* Image Skeleton */}
        <div className="w-full h-40 bg-muted/30 rounded-t-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Type Label Skeleton */}
        <div className="h-4 w-16 bg-muted/20 rounded-full" />
        
        {/* Title Skeleton */}
        <div className="h-6 w-3/4 bg-muted/20 rounded-lg" />
        
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
