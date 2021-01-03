import { bgRed, green, red } from "https://deno.land/std/fmt/colors.ts";
import { bgBlue, flagParse, sprintf } from "./deps.ts";
import { DictionaryFactory } from "./dictionary_factory.ts";
import { pinyinToAlphabet } from "./pinyin_to_alphabet.ts";

const dictionary = await DictionaryFactory.create(
  "./dict/HSK3-word-japanese.csv",
  "./dict/HSK4-word-japanese.csv",
  "./dict/HSK5-word-japanese.csv",
  "./dict/HSK6-word-japanese.csv",
);
const startIndex = await readStartIndex();
dictionary.skip(startIndex);
const args = flagParse(Deno.args);
for (const word of dictionary.getWords()) {
  console.log(`---------------
    ${word.index}
${word.mean}`);
  const input = prompt(word.han);

  if (args.say) {
    Deno.run({
      cmd: ["say", "-v", "Ting-Ting", word.han],
    });
  }
  if (pinyinToAlphabet(word.pin) === input) {
    console.log(
      green(sprintf(`%${word.han.length * 2}-s`, "◎")),
      bgBlue(word.pin),
    );
    continue;
  }
  console.log(red(sprintf(`%${word.han.length * 2}-s`, "×")), bgRed(word.pin));
}

async function readStartIndex() {
  try {
    return await Deno.readTextFile("./dict/dict.idx");
  } catch (e) {
    return "HSK3-1";
  }
}
