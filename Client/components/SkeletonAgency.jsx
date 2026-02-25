export function SkeletonAgency() {
  return (
    <div className="bg-card rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        {/* Image Skeleton */}
        <div className="w-full h-48 bg-muted/30 rounded-t-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Title Skeleton */}
        <div className="h-5 w-3/4 bg-muted/20 rounded-lg" />
        
        {/* Category Skeleton */}
        <div className="h-4 w-24 bg-muted/20 rounded-full" />
        
        {/* Rating Skeleton */}
        <div className="h-4 w-16 bg-muted/20 rounded-full" />
      </div>
    </div>
  );
}
