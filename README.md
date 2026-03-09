# Ahorcado

Juego clásico del ahorcado desarrollado como aplicación web con Next.js.

Adivina la palabra letra por letra antes de que se complete la figura. Incluye teclado virtual, soporte para teclado físico, animaciones con Framer Motion y modo claro/oscuro.

## Tecnologías

- **Next.js 16** — App Router
- **React 19** — Componentes con hooks
- **TypeScript 5** — Tipado estático
- **Tailwind CSS 4** — Estilos utilitarios
- **Framer Motion** — Animaciones del muñeco y transiciones
- **Lucide React** — Iconos

## Estructura del proyecto

```
app/
  page.tsx              Página principal
  layout.tsx            Layout con tema y fuentes
  api/words/route.ts    API para obtener palabras
src/
  components/game/      Componentes del juego
    HangmanGame.tsx     Componente principal (estado y lógica)
    HangmanFigure.tsx   Dibujo SVG animado del ahorcado
    WordDisplay.tsx     Palabra con letras ocultas
    VirtualKeyboard.tsx Teclado interactivo
    GameStatus.tsx      Intentos, resultado y reinicio
  components/theme/
    ThemeToggle.tsx      Botón modo claro/oscuro
  data/words.ts         Lista de palabras en español
  lib/game.ts           Lógica pura del juego
  types/game.ts         Tipos TypeScript
```

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Cómo jugar

1. Se selecciona una palabra aleatoria en español.
2. Haz clic en las letras del teclado virtual o usa el teclado físico.
3. Cada letra incorrecta dibuja una parte del muñeco (6 intentos máximo).
4. Ganas si completas la palabra. Pierdes si se dibuja la figura completa.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Lint con ESLint |
