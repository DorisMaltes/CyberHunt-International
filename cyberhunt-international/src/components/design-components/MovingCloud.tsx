
//this is a componente for the cloud decoration meant to be used as the background layouts for either Dektop or Mobile
import React, { useEffect, useRef } from 'react';

interface MovingCloudProps {
  imageUrl: string;
  direction: 'left-to-right' | 'right-to-left';
  size: {
    width: string; 
    height: string; 
  };
  speed: number; // 1 (slowest) to 10 (fastest)
  yPosition: string; // Tailwind classes like 'top-10', 'top-1/2', 'bottom-20'
  zIndex?: string; // Tailwind z-index class like 'z-0', 'z-10'
}

const MovingCloud: React.FC<MovingCloudProps> = ({
  imageUrl,
  direction,
  size,
  speed,
  yPosition,
  zIndex = 'z-0'
}) => {
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    // Calcular la duración basada en la velocidad (1-10)
    const duration = 15000 / speed; // 15 segundos para velocidad 1, 1.5 segundos para velocidad 10

    // Configurar la animación
    const keyframes = [
      { 
        transform: direction === 'right-to-left' 
          ? 'translateX(100vw)' 
          : 'translateX(-100%)' 
      },
      { 
        transform: direction === 'right-to-left' 
          ? 'translateX(-100%)' 
          : 'translateX(100vw)' 
      }
    ];

    const options: KeyframeAnimationOptions = {
      duration: duration,
      iterations: Infinity,
      easing: 'linear'
    };

    const animation = cloud.animate(keyframes, options);

    // Limpieza
    return () => {
      animation.cancel();
    };
  }, [direction, speed]);

  return (
    <div
      ref={cloudRef}
      className={`absolute ${yPosition} ${size.width} ${size.height} ${zIndex} select-none pointer-events-none`}
      style={{
        left: direction === 'right-to-left' ? '0' : '0',
        transform: direction === 'right-to-left' 
          ? 'translateX(100vw)' 
          : 'translateX(-100%)'
      }}
    >
      <img
        src={imageUrl}
        alt="Background Cloud"
        className="w-full h-full object-contain"
        draggable="false"
      />
    </div>
  );
};

export default MovingCloud;