import { Import, Link, useRouter } from "https://deno.land/x/aleph/mod.ts";
import React, { useEffect, useState } from "https://esm.sh/react";
import BingSearchPanel from "../../components/BingSearchPanel.tsx";
import Logo from "../../components/Logo.tsx";
import Toggle from "../../components/Toggle.tsx";

export default function Dictionary() {
  const { params } = useRouter();

  const [word, setWord] = useState(
    { pin: undefined, han: undefined, mean: undefined },
  );

  useEffect(() => {
    const f = async () => {
      const w = await (await fetch(
        // @ts-ignore
        `${window.location.origin}/api/dictionaries?id=${params.id}`,
      )).json();
      setWord(w);
    };
    f();
  }, [params.id]);
  const [isImagePanel, setIsImagePanel] = useState(false);

  return (
    <div className="page">
      <Import from="../../style/index.less" />
      <p className="logo"><Logo /></p>
      <p className="pin">{word?.pin}</p>
      <p className="han">{word?.han}</p>
      <p className="mean">{word?.mean}</p>
      <p className="links">
        <Link to={`../${Number(params.id) - 1}`}>Prev</Link>
        <Link to={`../${Number(params.id) + 1}`}>Next</Link>
      </p>
      <Toggle
        checked={isImagePanel}
        onChange={() => setIsImagePanel((b) => !b)}
      />
      {isImagePanel ? <BingSearchPanel han={word?.han ?? "什么?"} /> : null}
    </div>
  );
}
