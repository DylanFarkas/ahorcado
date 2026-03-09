# 📝 Plan de Desarrollo - Juego Ahorcado (Hangman)

## 🎯 Objetivo
Desarrollar un juego web del Ahorcado moderno, limpio y escalable usando Next.js + TypeScript + Tailwind CSS + Framer Motion.

---

## 📦 Estado Actual del Proyecto

### Dependencias Instaladas
- ✅ Next.js 16.1.6
- ✅ React 19.2.3  
- ✅ TypeScript 5
- ✅ Tailwind CSS 4
- ✅ ESLint configurado

### Dependencias a Instalar
- ❌ Framer Motion (para animaciones)

---

## 📐 Arquitectura del Proyecto

```
ahorcado/
├── app/
│   ├── page.tsx                    # Página principal del juego
│   ├── layout.tsx                  # Layout existente
│   ├── globals.css                 # Estilos globales existentes
│   └── api/
│       └── words/
│           └── route.ts            # API Route para obtener palabras aleatorias
├── src/
│   ├── components/
│   │   └── game/
│   │       ├── HangmanGame.tsx     # Componente principal del juego
│   │       ├── WordDisplay.tsx     # Muestra la palabra con guiones
│   │       ├── VirtualKeyboard.tsx # Teclado virtual A-Z
│   │       ├── GameStatus.tsx      # Estado del juego (ganó/perdió/jugando)
│   │       └── HangmanFigure.tsx   # Dibujo del ahorcado
│   ├── data/
│   │   └── words.ts                # Lista de palabras del juego
│   ├── lib/
│   │   └── game.ts                 # Lógica del juego
│   └── types/
│       └── game.ts                 # Tipos TypeScript del juego
└── public/                         # Recursos estáticos (existente)
```

---

## 📋 Plan de Implementación (Paso a Paso)

### **FASE 1: Configuración Inicial** ⚙️

#### Paso 1.1: Instalar Framer Motion
```bash
npm install framer-motion
```

#### Paso 1.2: Crear estructura de carpetas
- Crear carpeta `src/` en la raíz
- Crear subcarpetas: `components/game/`, `data/`, `lib/`, `types/`
- Crear carpeta `app/api/words/`

---

### **FASE 2: Definir Tipos y Datos** 📊

#### Paso 2.1: Crear tipos TypeScript (`src/types/game.ts`)
Definir interfaces:
- `GameStatus`: 'playing' | 'won' | 'lost'
- `GameState`: estado completo del juego (palabra, letras adivinadas, errores, etc.)
- `Letter`: información de cada letra

#### Paso 2.2: Crear datos de palabras (`src/data/words.ts`)
- Array de palabras en español para el juego
- Categorías opcionales (animales, países, frutas, etc.)
- Función para obtener palabra aleatoria

---

### **FASE 3: Implementar Lógica del Juego** 🎮

#### Paso 3.1: Crear lógica del juego (`src/lib/game.ts`)
Implementar funciones:
- `selectRandomWord()`: Seleccionar palabra aleatoria
- `validateLetter()`: Validar si letra existe en la palabra
- `getCorrectLetters()`: Calcular letras correctas reveladas
- `calculateErrors()`: Contar errores
- `checkGameStatus()`: Determinar estado (playing/won/lost)
- `initializeGame()`: Inicializar estado del juego
- Constantes: `MAX_ATTEMPTS = 6`

---

### **FASE 4: Crear API Route** 🚀

#### Paso 4.1: Implementar API de palabras (`app/api/words/route.ts`)
- Endpoint GET que devuelve una palabra aleatoria
- Usar datos de `src/data/words.ts`
- Retornar JSON con: `{ word: string }`

---

### **FASE 5: Desarrollar Componentes UI** 🎨

#### Paso 5.1: HangmanFigure (`src/components/game/HangmanFigure.tsx`)
- Componente que dibuja el ahorcado según número de errores
- Usar SVG para el dibujo
- Animaciones con Framer Motion (aparición progresiva)
- 6 etapas de dibujo (base, poste, viga, cuerda, cabeza, cuerpo, brazos, piernas)

#### Paso 5.2: WordDisplay (`src/components/game/WordDisplay.tsx`)
- Mostrar palabra con guiones para letras no adivinadas
- Revelar letras adivinadas
- Animaciones de revelación con Framer Motion
- Estilo con Tailwind CSS

#### Paso 5.3: VirtualKeyboard (`src/components/game/VirtualKeyboard.tsx`)
- Teclado virtual con letras A-Z
- Deshabilitar letras ya usadas
- Diferenciar letras correctas/incorrectas con colores
- Animaciones de clic con Framer Motion
- Diseño responsive (grid)

#### Paso 5.4: GameStatus (`src/components/game/GameStatus.tsx`)
- Mostrar intentos restantes
- Mensaje de victoria/derrota
- Botón "Nueva Partida"
- Animaciones de transición con Framer Motion
- Efectos visuales según estado del juego

#### Paso 5.5: HangmanGame (`src/components/game/HangmanGame.tsx`)
- Componente principal que orquesta el juego
- Manejo del estado con useState/useEffect
- Integrar todos los subcomponentes
- Lógica de eventos (click en letras, reiniciar)
- Llamada a API para obtener palabra

---

### **FASE 6: Integrar en la Página Principal** 🏠

#### Paso 6.1: Actualizar `app/page.tsx`
- Importar y renderizar `HangmanGame`
- Diseño centrado y responsive
- Título y descripción del juego
- Fondo atractivo con gradientes

---

### **FASE 7: Estilos y Animaciones** 💅

#### Paso 7.1: Configurar Tailwind CSS
- Verificar configuración en `globals.css`
- Definir colores personalizados si es necesario
- Tema oscuro/claro opcional

#### Paso 7.2: Implementar animaciones con Framer Motion
- Entrada de componentes (fade in, slide)
- Revelación de letras
- Aparición progresiva del ahorcado
- Efectos de hover y click
- Animación de victoria/derrota

---

### **FASE 8: Pruebas y Refinamiento** ✅

#### Paso 8.1: Pruebas funcionales
- Verificar selección de palabra aleatoria
- Probar detección de letras correctas/incorrectas
- Validar condiciones de victoria
- Validar condiciones de derrota
- Probar botón de reinicio

#### Paso 8.2: Pruebas de UI/UX
- Responsive design (móvil, tablet, desktop)
- Accesibilidad (contraste, navegación por teclado)
- Animaciones suaves
- Feedback visual claro

#### Paso 8.3: Optimizaciones
- Performance de animaciones
- Código limpio y comentado
- Eliminar console.logs
- Verificar tipos TypeScript

---

## 🎨 Diseño UI (Características)

### Paleta de Colores
- **Correctas**: Verde (bg-green-500)
- **Incorrectas**: Rojo (bg-red-500)
- **No usadas**: Gris claro (bg-gray-200)
- **Deshabilitadas**: Gris oscuro (bg-gray-400)
- **Fondo**: Gradiente azul/púrpura

### Componentes Visuales
- Palabra: Letras grandes, espaciadas, con animación de revelación
- Teclado: Grid responsive, botones con hover y animaciones
- Ahorcado: SVG animado, líneas que aparecen progresivamente
- Mensajes: Alertas destacadas con animación de entrada
- Botón reiniciar: Grande, colorido, con icono de reload

---

## 🔧 Funcionalidades Extra (Opcionales)

1. **Contador de victorias/derrotas**
2. **Historial de palabras jugadas**
3. **Niveles de dificultad** (fácil, medio, difícil)
4. **Pistas** (mostrar una letra al azar)
5. **Temporizador**
6. **Categorías de palabras**
7. **Sonidos** (correcta, incorrecta, victoria, derrota)
8. **Modo multijugador** (dos jugadores)
9. **Persistencia en localStorage**
10. **Animación de confeti** al ganar

---

## 📊 Resumen de Tareas

| Fase | Tareas | Estado |
|------|--------|--------|
| 1. Configuración | Instalar framer-motion + crear estructura | ⏳ Pendiente |
| 2. Tipos y Datos | Definir interfaces + crear palabras | ⏳ Pendiente |
| 3. Lógica | Implementar lib/game.ts | ⏳ Pendiente |
| 4. API | Crear API Route /api/words | ⏳ Pendiente |
| 5. Componentes | Crear 5 componentes del juego | ⏳ Pendiente |
| 6. Integración | Actualizar page.tsx | ⏳ Pendiente |
| 7. Estilos | Tailwind + Framer Motion | ⏳ Pendiente |
| 8. Pruebas | Testing + Optimizaciones | ⏳ Pendiente |

---

## 🚀 Orden de Ejecución Recomendado

1. ✅ Instalar dependencias (framer-motion)
2. ✅ Crear estructura de carpetas
3. ✅ Definir tipos TypeScript
4. ✅ Crear datos de palabras
5. ✅ Implementar lógica del juego
6. ✅ Crear API Route
7. ✅ Desarrollar HangmanFigure
8. ✅ Desarrollar WordDisplay
9. ✅ Desarrollar VirtualKeyboard
10. ✅ Desarrollar GameStatus
11. ✅ Desarrollar HangmanGame (componente principal)
12. ✅ Integrar en page.tsx
13. ✅ Aplicar estilos y animaciones
14. ✅ Probar y refinar

---

## 📝 Notas Técnicas

### Estado del Juego (GameState)
```typescript
{
  word: string;              // Palabra a adivinar
  guessedLetters: Set<string>; // Letras ya adivinadas
  errors: number;            // Número de errores
  status: GameStatus;        // playing | won | lost
  maxAttempts: number;       // Máximo de intentos (6)
}
```

### Lógica de Victoria
- El jugador gana cuando todas las letras de la palabra han sido adivinadas

### Lógica de Derrota
- El jugador pierde cuando `errors >= maxAttempts`

---

## 🎯 Resultado Esperado

Un juego funcional del Ahorcado donde:
- ✅ El jugador puede seleccionar letras con el teclado virtual
- ✅ Se revelan las letras correctas en la palabra
- ✅ Se dibuja el ahorcado progresivamente con cada error
- ✅ Se muestra claramente cuándo se gana o pierde
- ✅ Se puede reiniciar la partida fácilmente
- ✅ Las animaciones hacen la experiencia más atractiva
- ✅ El diseño es responsive y moderno
- ✅ El código es limpio, tipado y escalable

---

**Fecha de creación:** 9 de marzo de 2026  
**Desarrollador:** GitHub Copilot  
**Stack:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 + Framer Motion
