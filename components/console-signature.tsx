"use client";

import { useEffect } from "react";

export function ConsoleSignature() {
  useEffect(() => {
    console.log(
      "%c\n     ╦╔╦╗╔═╗\n     ║║║║╠═╝\n    ╚╝╩ ╩╩  \n\n%cBuilt with code, craft, and curiosity.\n",
      "color: #f37dd9; font-family: monospace; font-size: 14px; font-weight: bold;",
      "color: #c199fe; font-family: monospace; font-size: 11px;"
    );
  }, []);

  return null;
}
