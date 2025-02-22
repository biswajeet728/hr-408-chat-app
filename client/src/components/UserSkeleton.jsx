import React from "react";
import { cn } from "../lib/util";

function UserSkeleton() {
  const skeletonContacts = Array(6).fill(null);

  return (
    <>
      {skeletonContacts.map((_, index) => (
        <div
          className={cn(
            "flex items-center justify-between bg-slate-200 p-2 rounded-lg mt-2 animate-pulse"
          )}
          key={index}
        >
          <div className="flex items-start">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-4 flex flex-col gap-2">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="flex flex-col mt-1 gap-2 items-end">
            <div className="w-12 h-3 bg-gray-300 rounded"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserSkeleton;
