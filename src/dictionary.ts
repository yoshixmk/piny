import { Word } from "./dictionary_factory.ts";

export class Dictionary {
  private words: Array<Word>;

  constructor(words: Array<Word>) {
    this.words = words;
  }

  public skip(startIndex: string) {
    while (true) {
      const word = this.words.shift();
      if (word === undefined) {
        console.log("No matching index was found. Check your dict.idx");
        Deno.exit(0);
      }
      if (word && word.index === startIndex) {
        this.words.unshift(word);
        break;
      }
    }
  }

  public getWords() {
    return this.words;
  }
}
