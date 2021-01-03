export const recordText = async (index: string, isCorrect: boolean) =>
  await Deno.writeTextFile(
    `./records/${isCorrect ? "correct" : "incorrect"}.txt`,
    index,
    { append: true },
  );
