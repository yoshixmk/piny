export const recordText = (index: string, isCorrect: boolean) =>
  Deno.writeTextFileSync(
    `./records/${isCorrect ? "correct" : "incorrect"}.txt`,
    `${index}\n`,
    { append: true },
  );
