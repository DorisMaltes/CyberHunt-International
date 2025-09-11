import { useState, useEffect } from 'react'
import AnimatedCharacter from './components/AnimatedCharacter'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPageAndRegisterPage from './pages/LogInPageAndRegisterPage'

import TopDownWorld from './pages/WorldMap'



//pages:
import LogInPage from './pages/LogInPage'
import Registration from './pages/Registration'



interface Position {
  x: number
  y: number
}

interface QuestionPoint {
  id: number
  position: Position
  question: string
  answer: string
  isAnswered: boolean
}

const GAME_WIDTH = 800
const GAME_HEIGHT = 400
const PLAYER_SIZE = 84
const MOVE_SPEED = 6

const questionPoints: QuestionPoint[] = [
  {
    id: 1,
    position: { x: 200, y: 300 },
    question: "¿Cuál es la capital de Francia?",
    answer: "París",
    isAnswered: false
  },
  {
    id: 2,
    position: { x: 500, y: 300 },
    question: "¿Cuántos lados tiene un triángulo?",
    answer: "3",
    isAnswered: false
  },
  {
    id: 3,
    position: { x: 700, y: 300 },
    question: "¿Qué color es el cielo?",
    answer: "Azul",
    isAnswered: false
  }
]

function App() {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 50, y: 300 })
  const [score, setScore] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionPoint | null>(null)
  const [keys, setKeys] = useState<Set<string>>(new Set())
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.key))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev)
        newKeys.delete(e.key)
        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Game loop for movement
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPlayerPosition(prev => {
        let newX = prev.x
        let newY = prev.y
        let newDirection = direction
        let moving = false

        // Horizontal movement
        if (keys.has('ArrowLeft')) {
          newX = Math.max(0, prev.x - MOVE_SPEED)
          newDirection = 'left'
          moving = true
        }
        if (keys.has('ArrowRight')) {
          newX = Math.min(GAME_WIDTH - PLAYER_SIZE, prev.x + MOVE_SPEED)
          newDirection = 'right'
          moving = true
        }

        // Vertical movement (simple up/down)
        if (keys.has('ArrowUp')) {
          newY = Math.max(0, prev.y - MOVE_SPEED)
          moving = true
        }
        if (keys.has('ArrowDown')) {
          newY = Math.min(GAME_HEIGHT - PLAYER_SIZE, prev.y + MOVE_SPEED)
          moving = true
        }

        // Update movement state
        setIsMoving(moving)
        setDirection(newDirection)

        // Check collision with question points
        questionPoints.forEach(point => {
          if (!point.isAnswered) {
            const distance = Math.sqrt(
              Math.pow(newX - point.position.x, 2) + 
              Math.pow(newY - point.position.y, 2)
            )
            if (distance < 60 && !showQuestion) {
              setCurrentQuestion(point)
              setShowQuestion(true)
            }
          }
        })

        return { x: newX, y: newY }
      })
    }, 16) // 60 FPS for smooth movement

    return () => clearInterval(gameLoop)
  }, [keys, showQuestion, direction])

  const handleAnswer = (answer: string) => {
    if (currentQuestion && answer === currentQuestion.answer) {
      setScore(prev => prev + 10)
      
      // Mark question as answered
      const questionIndex = questionPoints.findIndex(q => q.id === currentQuestion.id)
      if (questionIndex !== -1) {
        questionPoints[questionIndex].isAnswered = true
      }
    }
    
    setShowQuestion(false)
    setCurrentQuestion(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPageAndRegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/game" element={<TopDownWorld />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    
      {/* <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-600 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          


           Game Canvas 
          <div 
            className="relative bg-gradient-to-b from-green-200 to-green-400 border-4 border-gray-800 rounded-lg overflow-hidden"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          >
             Animated Character 
            <AnimatedCharacter
              position={playerPosition}
              isMoving={isMoving}
              direction={direction}
              size={PLAYER_SIZE}
              showDebug={false} // No mostrar debug por defecto
            />

            {/* Question Points 
            {questionPoints.map(point => !point.isAnswered && (
              <div
                key={point.id}
                className="absolute bg-yellow-400 border-4 border-yellow-600 rounded-full flex items-center justify-center animate-pulse"
                style={{
                  left: point.position.x,
                  top: point.position.y,
                  width: 50,
                  height: 50
                }}
              >
                <span className="text-yellow-800 text-2xl font-bold">❓</span>
              </div>
            ))}

            {/* Background elements 
            <div className="absolute top-10 left-20 text-4xl">☁️</div>
            <div className="absolute top-20 right-32 text-3xl">☁️</div>
            <div className="absolute top-15 left-96 text-2xl">☁️</div>
            
            {/* Ground line 
            <div 
              className="absolute bg-brown-600 border-t-4 border-brown-800"
              style={{
                left: 0,
                top: 350,
                width: GAME_WIDTH,
                height: 50
              }}
            />
          </div>

          {/* Question Modal 
          {showQuestion && currentQuestion && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  🎯 Pregunta:
                </h3>
                <p className="text-lg mb-6 text-gray-700">
                  {currentQuestion.question}
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleAnswer(currentQuestion.answer)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    {currentQuestion.answer}
                  </button>
                  
                  <button
                    onClick={() => handleAnswer('Respuesta incorrecta')}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Respuesta incorrecta
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div> */}
      
    </BrowserRouter>
  )
}

export default App
