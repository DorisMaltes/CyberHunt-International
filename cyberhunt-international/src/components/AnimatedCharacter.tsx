import React from 'react'
import { useSpriteAnimation } from '../hooks/useSpriteAnimation'
import { CHARACTER_SPRITE_CONFIG, CHARACTER_SIZES } from '../config/spriteConfig'

interface AnimatedCharacterProps {
  position: { x: number; y: number }
  isMoving: boolean
  direction: 'left' | 'right' | null
  size?: keyof typeof CHARACTER_SIZES | number
  showDebug?: boolean // Opción para mostrar/ocultar debug
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  position,
  isMoving,
  direction,
  size = 'medium',
  showDebug = false // Por defecto no mostrar debug
}) => {
  // Determinar el tamaño del personaje
  const characterSize = typeof size === 'string' ? CHARACTER_SIZES[size] : size
  
  // Configuración personalizada del sprite
  const spriteConfig = {
    frameWidth: characterSize,
    frameHeight: characterSize,
    totalFrames: CHARACTER_SPRITE_CONFIG.totalFrames,
    animationSpeed: CHARACTER_SPRITE_CONFIG.animationSpeed,
    spriteType: CHARACTER_SPRITE_CONFIG.spriteType,
    individualSpritesPath: CHARACTER_SPRITE_CONFIG.individualSpritesPath,
    individualSpritePattern: CHARACTER_SPRITE_CONFIG.individualSpritePattern,
    spriteSheetPath: CHARACTER_SPRITE_CONFIG.spriteSheetPath
  }

  const { 
    spriteStyle, 
    currentFrame, 
    spriteLoaded, 
    config, 
    currentSpriteSrc,
    spriteType 
  } = useSpriteAnimation({
    isMoving,
    direction,
    spriteConfig
  })

  // Fallback para cuando no hay sprites
  const fallbackStyle: React.CSSProperties = {
    width: characterSize,
    height: characterSize,
    backgroundColor: '#3b82f6',
    border: '4px solid #1e40af',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
    transition: 'transform 0.1s ease'
  }

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {/* Imágenes individuales cuando están disponibles */}
      {spriteLoaded && spriteType === 'individual' && currentSpriteSrc && (
        <img
          src={currentSpriteSrc}
          alt={`Character frame ${currentFrame + 1}`}
          style={{
            width: characterSize,
            height: characterSize,
            transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
            transition: 'transform 0.1s ease',
            imageRendering: 'pixelated'
          }}
        />
      )}
      
      {/* Sprite Sheet cuando está disponible */}
      {spriteLoaded && spriteType === 'spritesheet' && spriteStyle.backgroundImage && (
        <div style={spriteStyle} />
      )}
      
      {/* Fallback cuando no hay sprites */}
      {(!spriteLoaded || (!currentSpriteSrc && !spriteStyle.backgroundImage)) && (
        <div style={fallbackStyle}>
          <span className="text-white text-xl">👤</span>
        </div>
      )}
      
      {/* Indicador de debug solo si se solicita explícitamente */}
      {showDebug && (
        <div className="absolute -top-6 left-0 text-xs bg-black text-white px-1 rounded">
          {spriteLoaded ? (
            <>
              {spriteType === 'individual' ? '🖼️' : '🎬'} Frame: {currentFrame + 1}/{config.totalFrames}
              <br />
              {isMoving ? '🔄' : '⏸️'} {spriteType}
            </>
          ) : (
            '❌ No sprites'
          )}
        </div>
      )}
    </div>
  )
}

export default AnimatedCharacter
