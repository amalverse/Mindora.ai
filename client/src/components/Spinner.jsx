export default function Spinner({ size = 'sm', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin ${className}`} />
  );
}
