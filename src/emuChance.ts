import { environment } from "./environment.js";

let emuChance = environment.EMU_CHANCE;

export function getEmu() {
  return emuChance;
}

export function setEmu(chance: number) {
  emuChance = chance;
}
