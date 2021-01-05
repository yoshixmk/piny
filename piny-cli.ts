import { bgBlue, bgRed, green, red } from "colors";
import { parse } from "flags";
import { sprintf } from "printf";
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
const args = parse(Deno.args);
if (args.overcome) {
  const incorrect = readIncorrect();
  dictionary.overcomeWeekness(incorrect);
} else {
  const startIndex = readStartIndex();
  dictionary.skip(startIndex);
}
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
    recordText(word.index, isCorrect);
  }
}

function readStartIndex() {
  try {
    return Deno.readTextFileSync("./dict/dict.idx");
  } catch (e) {
    return "HSK3-1";
  }
}

function readIncorrect() {
  try {
    const correctList = Deno.readTextFileSync("./records/correct.txt").split(
      "\n",
    );
    return Deno.readTextFileSync("./records/incorrect.txt").split("\n").filter(
      (incorrect) => !correctList.includes(incorrect),
    );
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
}
