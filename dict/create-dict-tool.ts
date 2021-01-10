import pinyin from "https://deno.land/x/pinyin/mod.ts";

while(1) {
  const han = prompt("han: ");
  const mean = prompt("mean: ");
  const pin = pinyin(han).flat().join("");

  Deno.writeTextFileSync('output.csv', `${han}, ${pin}, ${mean}\n`, { append: true });
}
