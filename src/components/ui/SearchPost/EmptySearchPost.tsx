import React from "react";
import { Search } from "lucide-react";

const EmptySearchPost = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <Search className="w-12 h-12 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-900 mb-1">No posts found</h3>
      <p className="text-sm text-gray-500">
        Try adjusting your search to find what you&#39;re looking for.
      </p>
    </div>
  );
};

export default EmptySearchPost;
