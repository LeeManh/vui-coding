"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/Tabs";

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("MỚI NHẤT");

  const tabs = ["MỚI NHẤT", "SERIES", "ABOUT"];

  return (
    <nav className={cn("bg-gray-900 border-t border-gray-200")}>
      <div className="max-w-screen-lg mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-none p-0 h-auto space-x-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "text-white uppercase text-sm py-4 px-2 transition-all duration-200 relative",
                  "bg-transparent border-none rounded-none h-auto",
                  "hover:text-gray-200",
                  "data-[state=active]:bg-transparent data-[state=active]:text-white",
                  "focus-visible:ring-0 focus-visible:outline-none cursor-pointer"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-2 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};
