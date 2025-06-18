interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
}

export default function Skeleton({ 
  height = 'h-10', 
  width = 'w-full', 
  className = ''
}: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${height} ${width} ${className}`}
    />
  );
}