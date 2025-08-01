export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-3"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}