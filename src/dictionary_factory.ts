import { BufReader } from "bufio";
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
    const openedFiles: Deno.File[] = await Promise.all(
      files.map((f) => Deno.open(f)),
    );
    try {
      const bufReaders = openedFiles.map((of) => BufReader.create(of));
      const lines = (await Promise.all(bufReaders.map((buf) => parse(buf))))
        .flat() as Array<Array<string>>;
      const words = lines.map(([_, han, pin, mean, index]) => {
        return { han, pin, mean, index };
      });
      return new Dictionary(words);
    } finally {
      openedFiles.forEach((of) => of.close());
    }
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
