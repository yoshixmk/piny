import { parse } from "csv";
import { Dictionary } from "./dictionary.ts";

export type Word = {
  han: string;
  pin: string;
  mean: string;
  index: string;
};

export class DictionaryFactory {
  public static async create(
    ...files: string[]
  ): Promise<Dictionary> {
    const linesEachFile = await Promise.all(files.map(file => Deno.readTextFile(file)));

    const lines = (await parse(linesEachFile.join("\n"))) as Array<Array<string>>;

    const words = lines.map(([_, han, pin, mean, index]) => {
      return { han, pin, mean, index };
    });
    return new Dictionary(words);
  }
  public static async createByDefault() {
    return await DictionaryFactory.create(
      "./dict/HSK3-word-japanese.csv",
      "./dict/HSK4-word-japanese.csv",
      "./dict/HSK5-word-japanese.csv",
      "./dict/HSK6-word-japanese.csv",
    );
  }
}
