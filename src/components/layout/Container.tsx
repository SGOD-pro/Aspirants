// Container.tsx
"use client";

import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-h-full overflow-hidden p-4">
      {children}
    </main>
  );
}

export default Container;
