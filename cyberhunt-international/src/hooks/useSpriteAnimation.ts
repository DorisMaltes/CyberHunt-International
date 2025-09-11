import { useState, useEffect, useRef } from 'react'
import { CHARACTER_SPRITE_CONFIG } from '../config/spriteConfig'

interface SpriteConfig {
  frameWidth: number
  frameHeight: number
  totalFrames: number
  animationSpeed: number
  spriteType: 'individual' | 'spritesheet'
  individualSpritesPath: string
  individualSpritePattern: string
  spriteSheetPath: string
}

interface UseSpriteAnimationProps {
  isMoving: boolean
  direction: 'left' | 'right' | null
  spriteConfig?: Partial<SpriteConfig>
}

export const useSpriteAnimation = ({ 
  isMoving, 
  direction, 
  spriteConfig = {} 
}: UseSpriteAnimationProps) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [spriteStyle, setSpriteStyle] = useState<React.CSSProperties>({})
  const [spriteLoaded, setSpriteLoaded] = useState(false)
  const [currentSpriteSrc, setCurrentSpriteSrc] = useState<string>('')
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  // Merge configuración por defecto con la personalizada
  const config = {
    ...CHARACTER_SPRITE_CONFIG,
    ...spriteConfig
  }

  // Verificar si las imágenes individuales existen
  useEffect(() => {
    if (config.spriteType === 'individual') {
      // Verificar si existe al menos la primera imagen
      const img = new Image()
      img.onload = () => setSpriteLoaded(true)
      img.onerror = () => setSpriteLoaded(false)
      
      const firstSpritePath = config.individualSpritePattern.replace('{frame}', '1')
      img.src = config.individualSpritesPath + firstSpritePath
    } else {
      // Verificar sprite sheet
      const img = new Image()
      img.onload = () => setSpriteLoaded(true)
      img.onerror = () => setSpriteLoaded(false)
      img.src = config.spriteSheetPath
    }
  }, [config.spriteType, config.individualSpritesPath, config.individualSpritePattern, config.spriteSheetPath])

  useEffect(() => {
    if (!isMoving) {
      setCurrentFrame(0) // Reset to idle frame
      return
    }

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime
      }

      const deltaTime = currentTime - lastTimeRef.current
      const frameInterval = 1000 / config.animationSpeed

      if (deltaTime >= frameInterval) {
        setCurrentFrame(prev => (prev + 1) % config.totalFrames)
        lastTimeRef.current = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMoving, config.animationSpeed, config.totalFrames])

  useEffect(() => {
    if (!spriteLoaded) {
      setSpriteStyle({})
      return
    }

    if (config.spriteType === 'individual') {
      // Para imágenes individuales, cambiar la imagen src
      const frameNumber = currentFrame + 1 // Los frames empiezan en 1
      const spritePath = config.individualSpritePattern.replace('{frame}', frameNumber.toString())
      const fullPath = config.individualSpritesPath + spritePath
      
      setCurrentSpriteSrc(fullPath)
      setSpriteStyle({
        width: config.frameWidth,
        height: config.frameHeight,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.1s ease',
        imageRendering: 'pixelated'
      })
    } else {
      // Para sprite sheet, usar background-position
      const frameOffset = currentFrame * config.frameWidth
      
      setSpriteStyle({
        width: config.frameWidth,
        height: config.frameHeight,
        backgroundImage: `url(${config.spriteSheetPath})`,
        backgroundPosition: `-${frameOffset}px 0`,
        backgroundRepeat: 'no-repeat',
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.1s ease',
        imageRendering: 'pixelated'
      })
    }
  }, [currentFrame, direction, config, spriteLoaded])

  return { 
    spriteStyle, 
    currentFrame, 
    spriteLoaded,
    config,
    currentSpriteSrc,
    spriteType: config.spriteType
  }
}
