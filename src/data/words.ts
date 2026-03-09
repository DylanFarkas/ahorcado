export const words: string[] = [
  // Animales
  "PERRO",
  "GATO",
  "ELEFANTE",
  "JIRAFA",
  "DELFIN",
  "TORTUGA",
  "MARIPOSA",
  "COCODRILO",
  "CANGURO",
  "MURCIELAGO",
  // Frutas
  "MANZANA",
  "PLATANO",
  "NARANJA",
  "SANDIA",
  "CEREZA",
  "MANGO",
  "DURAZNO",
  "FRESA",
  "LIMON",
  "PAPAYA",
  // Países
  "MEXICO",
  "ARGENTINA",
  "COLOMBIA",
  "ESPAÑA",
  "BRASIL",
  "PERU",
  "CHILE",
  "VENEZUELA",
  "ECUADOR",
  "BOLIVIA",
  // Objetos
  "COMPUTADORA",
  "TELEFONO",
  "BICICLETA",
  "GUITARRA",
  "PARAGUAS",
  "ALMOHADA",
  "ESCALERA",
  "LAMPARA",
  "MOCHILA",
  "VENTANA",
  // Naturaleza
  "MONTAÑA",
  "OCEANO",
  "VOLCAN",
  "CASCADA",
  "BOSQUE",
  "DESIERTO",
  "GLACIAR",
  "PRADERA",
  "PANTANO",
  "ARROYO",
];

export function getRandomWord(): string {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}
