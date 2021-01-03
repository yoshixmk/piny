export const say = (han: string) =>
  Deno.run({
    cmd: ["say", "-v", "Ting-Ting", han],
  });
