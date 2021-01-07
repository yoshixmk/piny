import React from "https://esm.sh/react";
export default function BingSearchPanel({ han }: { han: string }) {
  return (<iframe
    className="bing"
    src={`https://www.bing.com/images/search?qft=+filterui:photo-clipart&q=${han}`}
    name="sample"
  >
  </iframe>);
}
