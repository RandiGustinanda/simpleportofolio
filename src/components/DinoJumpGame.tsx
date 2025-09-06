'use client'

import { useEffect, useRef, useState } from 'react'

export default function FlappyRandiEasy() {
  const gameHeight = 300
  const birdSize = 40
  const pipeWidth = 50
  const gapHeight = 140
  const gravity = 1
  const jumpForce = -12

  const [birdY, setBirdY] = useState(120)
  const [velocity, setVelocity] = useState(0)
  const [pipeX, setPipeX] = useState(300)
  const [gapY, setGapY] = useState(80)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const gameInterval = useRef<any>(null)

  const handleJump = () => {
    if (gameOver) {
      resetGame()
    } else {
      setVelocity(jumpForce)
    }
  }

  // Listen for space bar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        handleJump()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [gameOver])

  // Game loop
  useEffect(() => {
    if (gameOver) return

    gameInterval.current = setInterval(() => {
      setBirdY(prev => {
        const nextY = prev + velocity
        if (nextY <= 0 || nextY + birdSize >= gameHeight) {
          setGameOver(true)
          return prev
        }
        return nextY
      })

      setVelocity(prev => prev + gravity)
      setPipeX(prev => {
        if (prev <= -pipeWidth) {
          setScore(s => s + 1)
          setGapY(Math.floor(Math.random() * (gameHeight - gapHeight - 40)) + 20)
          return 300
        }
        return prev - 4
      })
    }, 40)

    return () => clearInterval(gameInterval.current)
  }, [velocity, gameOver])

  // Collision detection
  useEffect(() => {
    const birdTop = birdY
    const birdBottom = birdY + birdSize
    const pipeLeft = pipeX
    const pipeRight = pipeX + pipeWidth

    const inX = pipeLeft < 100 + birdSize && pipeRight > 100
    const inY =
      birdTop < gapY || birdBottom > gapY + gapHeight

    if (inX && inY) {
      setGameOver(true)
      clearInterval(gameInterval.current)
    }
  }, [birdY, pipeX, gapY])

  const resetGame = () => {
    setBirdY(120)
    setPipeX(300)
    setGapY(80)
    setVelocity(0)
    setScore(0)
    setGameOver(false)
  }

  return (
    <div
      onClick={handleJump}
      className="relative w-full max-w-lg h-[300px] bg-blue-100 border border-blue-300 rounded-lg overflow-hidden mx-auto"
    >
      {/* Bird */}
      <div
        className="absolute w-[40px] h-[40px] left-[100px] text-3xl"
        style={{ top: `${birdY}px` }}
      >
        🐤
      </div>

      {/* Top pipe */}
      <div
        className="absolute w-[50px] bg-green-600"
        style={{
          left: `${pipeX}px`,
          top: 0,
          height: `${gapY}px`,
        }}
      />
      {/* Bottom pipe */}
      <div
        className="absolute w-[50px] bg-green-600"
        style={{
          left: `${pipeX}px`,
          top: `${gapY + gapHeight}px`,
          height: `${gameHeight - (gapY + gapHeight)}px`,
        }}
      />

      {/* Score */}
      <div className="absolute top-2 left-3 text-blue-800 font-bold">
        Score: {score}
      </div>

      {/* Game over screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white">
          <p className="text-xl font-bold">Game Over</p>
          <p className="mb-2">Score: {score}</p>
          <button
            onClick={resetGame}
            className="bg-yellow-300 text-black px-4 py-1 rounded hover:bg-yellow-400"
          >
            Main Lagi
          </button>
        </div>
      )}
    </div>
  )
}
