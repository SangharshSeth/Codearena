import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Send, Clock, User, Users, CheckCircle, Circle, Terminal, Zap } from 'lucide-react'

interface Question {
  id: number
  text: string
  options: string[]
}

const questions: Question[] = [
  { id: 1, text: "What is the primary function of a firewall?", options: ["Block unauthorized access", "Increase internet speed", "Encrypt data", "Manage passwords"] },
  { id: 2, text: "Which protocol is commonly used for secure shell connections?", options: ["HTTP", "FTP", "SSH", "SMTP"] },
  { id: 3, text: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "Secure Query Logic", "System Quality Level"] },
  { id: 4, text: "What is a common method used in password cracking?", options: ["Dictionary attack", "SQL injection", "Phishing", "Man-in-the-middle"] },
  { id: 5, text: "Which of these is not a type of malware?", options: ["Virus", "Trojan", "Worm", "Firewall"] },
  { id: 6, text: "What does VPN stand for?", options: ["Virtual Private Network", "Very Powerful Node", "Visual Processing Network", "Verified Public Node"] },
  { id: 7, text: "What is the purpose of a CAPTCHA?", options: ["Prevent automated access", "Encrypt passwords", "Speed up website loading", "Manage user accounts"] },
  { id: 8, text: "Which encryption algorithm is widely used for secure communication?", options: ["ROT13", "AES", "Base64", "MD5"] },
  { id: 9, text: "What does DoS stand for in cyber security?", options: ["Denial of Service", "Domain of Servers", "Data over Security", "Digital Operating System"] },
  { id: 10, text: "What is the main purpose of a honeypot in network security?", options: ["Attract and detect attackers", "Increase network speed", "Store sensitive data", "Manage user permissions"] },
]

export default function HackerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [opponentProgress, setOpponentProgress] = useState(0)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      Simulating opponent's progress
      if (Math.random() > 0.8) {
        setOpponentProgress((prev) => (prev < 10 ? prev + 1 : prev))
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Quiz submitted:', answers)
    Here you would typically send the answers to your backend
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#00ff41] p-6 font-mono overflow-hidden">
      <div className="flex-1 mr-6 bg-[#0f0f0f] rounded-xl border border-[#00ff41]/20 shadow-2xl shadow-[#00ff41]/10 p-2">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0f0f0f] border border-[#00ff41]/30 p-6 rounded-lg mb-6"
        >
          <h2 className="text-2xl mb-4 flex items-center">
            <Terminal className="mr-2 text-[#00ff41]" /> Question {currentQuestion + 1}
          </h2>
          <p className="text-xl mb-6 opacity-90">{questions[currentQuestion].text}</p>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-3 rounded-md transition-all duration-200 
                  ${answers[currentQuestion] === option 
                    ? 'bg-[#00ff41]/20 border border-[#00ff41]/50 text-[#00ff41]' 
                    : 'bg-[#1a1a1a] border border-[#00ff41]/20 hover:bg-[#00ff41]/10'}`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-[#1a1a1a] border border-[#00ff41]/30 rounded-md 
              disabled:opacity-30 hover:bg-[#00ff41]/10 transition-all duration-200"
          >
            <ChevronLeft className="mr-2 text-[#00ff41]" /> Previous
          </motion.button>
          {currentQuestion === questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={answers.includes(null)}
              className="flex items-center px-4 py-2 bg-[#1a1a1a] border border-[#00ff41]/30 rounded-md 
                disabled:opacity-30 hover:bg-[#00ff41]/10 transition-all duration-200"
            >
              Submit <Send className="ml-2 text-[#00ff41]" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-[#1a1a1a] border border-[#00ff41]/30 rounded-md 
                hover:bg-[#00ff41]/10 transition-all duration-200"
            >
              Next <ChevronRight className="ml-2 text-[#00ff41]" />
            </motion.button>
          )}
        </div>
      </div>
      <div className="w-64 bg-[#0f0f0f] border border-[#00ff41]/20 p-6 rounded-lg shadow-2xl shadow-[#00ff41]/10">
        <h3 className="text-xl mb-4 flex items-center">
          <Zap className="mr-2 text-[#00ff41]" /> Status
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <User className="mr-2 text-[#00ff41]" />
            <span>You: {answers.filter(Boolean).length} / 10</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 text-[#00ff41]" />
            <span>Opponent: {opponentProgress} / 10</span>
          </div>
          <div className="mt-6">
            <h4 className="text-lg mb-2">Time Left</h4>
            <motion.div
              className="flex items-center text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="mr-2 text-[#00ff41]" />
              <motion.span
                key={timeLeft}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="text-[#00ff41]"
              >
                {formatTime(timeLeft)}
              </motion.span>
            </motion.div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg mb-2">Question Progress</h4>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  className="w-6 h-6"
                >
                  {answers[index] ? (
                    <CheckCircle className="text-[#00ff41] opacity-80" />
                  ) : (
                    <Circle className="text-[#00ff41]/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
