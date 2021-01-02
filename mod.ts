import { BufReader, parse, bgBlue } from "./deps.ts";

const [hsk3File, hsk4File, hsk5File, hsk6File] = await Promise.all([
  Deno.open("./dict/HSK3-word-japanese.csv"),
  Deno.open("./dict/HSK4-word-japanese.csv"),
  Deno.open("./dict/HSK5-word-japanese.csv"),
  Deno.open("./dict/HSK6-word-japanese.csv"),
  // Deno.open("./dict/dict.idx", {createNew: true}),
]);

var startLine;
try {
  startLine = await Deno.readTextFile("./dict/dict.idx");
} catch(e) {
  startLine = "HSK3-1"
}

try {
  const buf3 = BufReader.create(hsk3File);
  const buf4 = BufReader.create(hsk4File);
  const buf5 = BufReader.create(hsk5File);
  const buf6 = BufReader.create(hsk6File);
  const result = await Promise.all(
    [parse(buf3), parse(buf4), parse(buf5), parse(buf6)],
  );
  console.dir(result.flat());

  for (const record of result.flat() as string[5][]) {
    const [_, han, pin, mean, index] = record;
    if (startLine && startLine !== index) {
      continue;
    }
    console.log(`---------------
    ${index}
${mean}`);
    const input = prompt(han);
    console.log(bgBlue(["Check:", input, "/", pin].join(" ")));
    // console.dir(record);
  }
} finally {
  hsk3File.close();
  hsk4File.close();
  hsk5File.close();
  hsk6File.close();
}
