import React from "react";

const ErrorPage = ({ error }: { error: string }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center text-center gap-2 h-96 relative top-[20vh]">
        <h1 className="text-4xl">❌</h1>
        <h2 className="text-2xl">{error}</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
