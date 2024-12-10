'use client'

import { useState, useEffect } from "react"
import { Terminal, X } from 'lucide-react'
import useStore from "../store/webSocketStore"
import { motion } from "framer-motion"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface MatchFoundProps {
  category: string
  playerName: string
  opponentsName: string
  onCancel: () => void
}

export default function MatchFound({
  category,
  playerName,
  opponentsName,
  onCancel,
}: MatchFoundProps) {
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      navigate("/start-match")
    }
  }, [countdown, navigate])

  const socket = useStore((state) => state.webSocket)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-black p-1 rounded-lg"
    >
      <div className="border-2 border-green-500 rounded-lg p-6 relative bg-black text-green-400">
        <h3 className="text-2xl mb-4 font-mono">Match Found!</h3>
        <p className="text-green-400 mb-4 font-mono">Category: {category}</p>
        <div className="flex justify-between items-center mb-6">
          <PlayerInfo name={playerName} />
          <span className="text-2xl mx-4 font-mono">VS</span>
          <PlayerInfo name={opponentsName} />
        </div>
        <div className="text-center">
          <p className="text-xl mb-2 font-mono">Match starting in</p>
          <motion.p
            key={countdown}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold font-mono"
          >
            {countdown}
          </motion.p>
        </div>
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-green-500 hover:text-green-400 transition-colors duration-200"
          aria-label="Cancel match"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  )
}

function PlayerInfo({ name }: { name: string }) {
  return (
    <div className="flex items-center bg-green-900 rounded-md p-2">
      <FaUser className="w-5 h-5 mr-2 text-green-400" />
      <span className="font-mono text-green-400">{name}</span>
    </div>
  )
}

