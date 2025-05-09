import React from "react";

interface LoadingHOCProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string | React.ReactNode;
}

export const LoadingHOC: React.FC<LoadingHOCProps> = ({
  isLoading,
  children,
  message,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        {message || "Loading..."}
      </div>
    );
  }

  return <>{children}</>;
};
