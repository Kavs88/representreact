export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff9d]"></div>
        <div className="mt-4 text-gray-400 text-lg">Loading...</div>
      </div>
    </div>
  );
} 