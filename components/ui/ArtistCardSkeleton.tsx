import React from 'react';

export default function ArtistCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Name skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        
        {/* Specialty skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
        
        {/* Bio skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex gap-2 mt-3">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );
} 