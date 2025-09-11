// Configuración del Sprite Sheet del Personaje
export const CHARACTER_SPRITE_CONFIG = {
  // Tamaño de cada frame individual
  frameWidth: 64,
  frameHeight: 64,
  
  // Número total de frames en la animación
  totalFrames: 6,
  
  // Velocidad de la animación (frames por segundo)
  animationSpeed: 12,
  
  // Tipo de sprite: 'individual' o 'spritesheet'
  spriteType: 'individual' as const,
  
  // Ruta base para imágenes individuales
  individualSpritesPath: '/src/assets/character-sprites/',
  
  // Ruta al sprite sheet (para compatibilidad)
  spriteSheetPath: '/src/assets/character-sprites/walking-sprite-sheet.png',
  
  // Patrón de nombres para imágenes individuales
  individualSpritePattern: 'walking-{frame}.png',
  
  // Configuración de animaciones específicas
  animations: {
    idle: {
      frames: [0], // Solo el primer frame
      speed: 1
    },
    walking: {
      frames: [0, 1, 2, 3, 4, 5], // Todos los frames
      speed: 12
    },
    running: {
      frames: [0, 1, 2, 3, 4, 5], // Mismos frames pero más rápido
      speed: 18
    }
  }
}

// Configuración para diferentes tamaños de personaje
export const CHARACTER_SIZES = {
  small: 32,
  medium: 64,
  large: 96
}

// Configuración de colisiones
export const COLLISION_CONFIG = {
  questionPointRadius: 60, // Radio de activación de preguntas
  playerCollisionBox: {
    width: 64,
    height: 64
  }
}
