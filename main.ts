import * as rls from "readline-sync";
import * as fs from "fs";
import { Casino } from "./clases/Casino";

function leerArchivoInstrucciones(juego: string) {
  // VER
  const ruta = `./instrucciones/${juego.toLowerCase()}.txt`;
  if (fs.existsSync(ruta)) {
    const instrucciones = fs.readFileSync(ruta, "utf-8");
    console.log(`\nInstrucciones para ${juego}:\n${instrucciones}`);
  } else {
    console.log(`\nNo se encontraron instrucciones para ${juego}.`);
  }
}

const casino: Casino = new Casino();

casino.abrirCasino();
