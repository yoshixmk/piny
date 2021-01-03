import { bgBlue, bgRed, flagParse, green, red, sprintf } from "./deps.ts";
import { DictionaryFactory } from "./src/dictionary_factory.ts";
import { pinyinToAlphabet } from "./src/pinyin-to-alphabet.ts";
import { recordText } from "./src/record-text.ts";
import { say } from "./src/say.ts";

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
    say(word.han);
  }
  const isCorrect = pinyinToAlphabet(word.pin) === input;
  if (isCorrect) {
    console.log(
      green(sprintf(`%${word.han.length * 2}-s`, "◎")),
      bgBlue(word.pin),
    );
  } else {
    console.log(
      red(sprintf(`%${word.han.length * 2}-s`, "×")),
      bgRed(word.pin),
    );
  }
  if (args.record) {
    await recordText(word.index, isCorrect);
  }
}

async function readStartIndex() {
  try {
    return await Deno.readTextFile("./dict/dict.idx");
  } catch (e) {
    return "HSK3-1";
  }
}
