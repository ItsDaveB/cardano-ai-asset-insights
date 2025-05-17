"use client"; // 👈 Required

import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href="/">Home</Link>
    </header>
  );
};
