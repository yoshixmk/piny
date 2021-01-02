export const pinyinToAlphabet = (text: string): string => {
  return text.replaceAll(/[āáǎà]/ig, "a")
    .replaceAll(/[ēéěè]/ig, "e")
    .replaceAll(/[īíǐì]/ig, "i")
    .replaceAll(/[ūúǔù]/ig, "u")
    .replaceAll(/[ōóǒò]/ig, "o")
    .replaceAll(/[ǖǘǚǜ]/ig, "u")
}
