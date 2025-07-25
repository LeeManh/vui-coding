import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  );
};

export default Loader;
