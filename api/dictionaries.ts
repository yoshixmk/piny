import type { APIRequest } from "https://deno.land/x/aleph/types.ts";
import { DictionaryFactory } from "../src/dictionary_factory.ts";

export default async function handler(req: APIRequest) {
  const dict = await DictionaryFactory.createByDefault();
  if (req.params.id) {
    req.status(200).json(dict.getWord(Number(req.params.id)));
    return;
  }
  req.status(200).json(dict.getWords());
}
