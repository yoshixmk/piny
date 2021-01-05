import {
  Import,
  Link,
  useDeno,
  useRouter,
} from "https://deno.land/x/aleph/mod.ts";
import React from "https://esm.sh/react";
import Logo from "../../components/logo.tsx";
import { DictionaryFactory } from "../../src/dictionary_factory.ts";

export default function Dictionary() {
  const { params } = useRouter();
  const word = useDeno(async () => {
    return (await DictionaryFactory.createByDefault()).getWord(
      Number(params.id),
    );
  });

  return (
    <div className="page">
      <Import from="../../style/index.less" />
      <p className="logo"><Logo /></p>
      <h1>Welcome to use <strong>Aleph.js</strong>!</h1>
      <p>{word?.pin}</p>
      <p>{word?.han}</p>
      <p>{word?.mean}</p>
      <p className="links">
        <Link to={`../${Number(params.id) - 1}`}>Prev</Link>
        <Link to={`../${Number(params.id) + 1}`}>Next</Link>
      </p>
    </div>
  );
}
