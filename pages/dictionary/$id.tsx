import {
  Import,
  Link,
  useDeno,
  useRouter,
} from "https://deno.land/x/aleph/mod.ts";
import React, { useState } from "https://esm.sh/react";
import Logo from "../../components/logo.tsx";
import Toggle from "../../components/toggle.tsx";
import { DictionaryFactory } from "../../src/dictionary_factory.ts";

export default function Dictionary() {
  const { params } = useRouter();
  const word = useDeno(async () => {
    return (await DictionaryFactory.createByDefault()).getWord(
      Number(params.id),
    );
  });
  // cannot use state because there is error importing deno.
  // const [isImagePanel, setIsImagePanel] = useState(false);

  return (
    <div className="page">
      <Import from="../../style/index.less" />
      <Import name="DictionaryFactory" from="../../src/dictionary_factory.ts" />
      {/* <Toggle checked={isImagePanel} onChange={() => setIsImagePanel((b) => !b)} /> */}
      <p className="logo"><Logo /></p>
      <p className="pin">{word?.pin}</p>
      <p className="han">{word?.han}</p>
      <p className="mean">{word?.mean}</p>
      <p className="links">
        <Link to={`../${Number(params.id) - 1}`}>Prev</Link>
        <Link to={`../${Number(params.id) + 1}`}>Next</Link>
      </p>
      <iframe
        src={`https://www.bing.com/images/search?qft=+filterui:photo-clipart&q=${word
          ?.han}`}
        name="sample"
        width="100%"
        height="100%"
        className="bing"
      >
      </iframe>
    </div>
  );
}
