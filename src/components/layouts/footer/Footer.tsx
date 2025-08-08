"use client";

import { getCurrentYear } from "@/lib/date";

export const Footer = () => {
  const currentYear = getCurrentYear();

  return (
    <footer className="py-8 border-t">
      <section className="app-container text-center">
        <span className=" text-sm  font-thin">© {currentYear} • leem</span>
      </section>
    </footer>
  );
};
