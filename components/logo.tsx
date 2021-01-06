import React from "https://esm.sh/react";

export default function Logo({ width = 100 }: { width?: number }) {
  return (
    <img src="/panda.jpg" width={width} title="Aleph.js" />
  );
}
