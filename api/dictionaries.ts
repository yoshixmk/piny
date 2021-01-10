import type { APIRequest } from "https://deno.land/x/aleph/types.ts";
import { DictionaryFactory } from "../src/dictionary-factory.ts";

export default async function handler(req: APIRequest) {
  const dict = await DictionaryFactory.createByDefault();
  if (req.url.includes("?id=")) {
    req.status(200).json(
      dict.getWord(Number(req.url.slice("/api/dictionaries?id=".length))),
    );
    return;
  }
  req.status(200).json(dict.getWords());
}
