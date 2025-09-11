# Character Sprites - Imágenes Individuales

Para que la animación funcione correctamente, coloca aquí las imágenes del personaje caminando como archivos separados.

## 🖼️ Estructura de Imágenes Individuales (RECOMENDADO):

```
walking-1.png
walking-2.png
walking-3.png
walking-4.png
walking-5.png
walking-6.png
```

### **Ventajas de Imágenes Individuales:**
- ✅ **Más fácil de crear** - cada frame es un archivo separado
- ✅ **Más fácil de editar** - puedes modificar frames individuales
- ✅ **Mejor compatibilidad** - funciona en todos los navegadores
- ✅ **Más flexible** - puedes tener diferentes números de frames

## 📋 Especificaciones Técnicas:

### **Nombres de Archivo:**
- **Formato**: `walking-{numero}.png`
- **Numeración**: Empieza en 1 (no en 0)
- **Ejemplo**: `walking-1.png`, `walking-2.png`, etc.

### **Tamaños Recomendados:**
- **Frame individual**: 64x64 píxeles (por defecto)
- **Cantidad de frames**: 6 frames para una animación suave
- **Formato**: PNG con transparencia (preferible)

### **Configuración Automática:**
El juego automáticamente:
- Detectará el número de frames disponibles
- Animará el personaje mientras se mueve
- Cambiará la dirección según el movimiento
- Mantendrá la animación fluida a 12 FPS

## 🎯 Cómo Crear tus Imágenes:

### **Paso 1: Diseñar el Personaje**
- Crea 6-8 frames de tu personaje caminando
- Mantén el mismo tamaño en todos los frames
- Usa un estilo consistente

### **Paso 2: Exportar las Imágenes**
- Guarda cada frame como PNG separado
- Usa transparencia si es posible
- Mantén la misma resolución

### **Paso 3: Nomenclatura**
- Nombra los archivos como `walking-1.png`, `walking-2.png`, etc.
- Los números deben ser secuenciales
- No uses espacios ni caracteres especiales

### **Paso 4: Colocar en la Carpeta**
- Guarda todos los archivos en: `assets/character-sprites/`
- El juego los detectará automáticamente

## 🔧 Personalización:

### **Cambiar Número de Frames:**
Edita `src/config/spriteConfig.ts`:
```typescript
totalFrames: 8,  // Cambia a 8 frames
```

### **Cambiar Patrón de Nombres:**
```typescript
individualSpritePattern: 'character-{frame}.png'
```

### **Cambiar Velocidad:**
```typescript
animationSpeed: 18,  // Más rápido
```

## 🎨 Herramientas Recomendadas:

### **Gratuitas:**
- **Piskel** (piskelapp.com) - Editor online de sprites
- **GIMP** - Editor de imágenes gratuito
- **Aseprite** (versión gratuita) - Especializado en sprites

### **Online:**
- **Pixilart** (pixilart.com) - Editor de píxeles online
- **Piskel** - Editor de sprites en el navegador

## ⚠️ Notas Importantes:

- **Todos los frames deben tener el mismo tamaño**
- **Los nombres deben seguir el patrón exacto**
- **Usa PNG para mantener la transparencia**
- **Los números empiezan en 1, no en 0**
- **No uses espacios en los nombres de archivo**

## ✅ Una vez Completado:

El juego automáticamente:
- 🎬 Mostrará la animación de caminar cuando te muevas
- 🔄 Cambiará la dirección del personaje según el movimiento
- ⚡ Mantendrá la animación fluida
- 🎯 Se adaptará al número de frames que tengas

## 🆘 Solución de Problemas:

### **No se ven las imágenes:**
- Verifica que los nombres sean exactos: `walking-1.png`, `walking-2.png`
- Asegúrate de que estén en la carpeta correcta
- Revisa que sean archivos PNG válidos

### **Animación muy rápida/lenta:**
- Ajusta `animationSpeed` en la configuración
- Valores más altos = más rápido
- Valores más bajos = más lento

### **Tamaño incorrecto:**
- Ajusta `frameWidth` y `frameHeight` en la configuración
- Todos los frames deben tener el mismo tamaño
