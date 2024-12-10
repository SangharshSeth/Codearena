import { Link } from "react-router-dom";
import { Terminal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MatchFound from "./Matchfound";
import { FaDocker, FaGithub, FaJs, FaNodeJs, FaSpinner } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { io, Socket } from "socket.io-client";
import useStore from "../store/webSocketStore.ts";

const categories = [
  { name: "JavaScript", icon: FaJs },
  { name: "Node.js", icon: FaNodeJs },

  { name: "Docker", icon: FaDocker },
  { name: "Web Security", icon: MdSecurity },
];

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: "a" | "b" | "c" | "d";
  explanation: string;
}

export default function FindMatch() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [username, setUsername] = useState("");
  const [matchFound, setMatchFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerSocketIds, setPlayerSocketIds] = useState<{ player1: string; player2: string } | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>()
  const [opponentsName, setOpponentsName] = useState<string>("")
  useEffect(() => {
  }, []);

  const handleFindOpponent = () => {
    if (selectedCategory && username) {
      setLoading(true);
      const socketConnection = io("http://localhost:8080", {
        reconnection: true,
      });
      useStore.getState().setWebSocket(socketConnection);
      socketConnection?.emit(
        "find-opponent",
        { userName: username, category: selectedCategory },
      );
      socketConnection?.on("start-match",
        (data: {
          player1: string,
          player2: string,
          questions: QuizQuestion[],
          player1Name: string,
          player2Name: string
        }) => {
          const opponentSocketId = data.player1 === socketConnection.id ? data.player2 : data.player1;
          const opponentsName = data.player1Name === username ? data.player2Name : data.player1Name;
          setQuizQuestions(data.questions)
          setMatchFound(true);
          setPlayerSocketIds({ player1: data.player1, player2: data.player2 });
          setOpponentsName(opponentsName)
          setLoading(false);
        })
      console.log("after log");
    } else {
      alert(
        "Please select a category and enter a username or login with GitHub",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-between bg-black text-green-500 font-mono p-4"
    >
      <header className="text-center mt-8 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <Terminal className="w-10 h-10 mr-2 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold font-sans">
            CodeBattle
          </h1>
        </div>
        <h2 className="text-sm md:text-base font-sans mt-2 text-green-400">
          Find Your Opponent
        </h2>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        {!matchFound
          ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-8 max-w-md w-full">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-700" />
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full py-2 pl-10 pr-3 bg-black border-2 border-green-700 rounded-md focus:border-green-500 focus:outline-none"
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        alert("GitHub OAuth login (to be implemented)")}
                      className="flex items-center justify-center py-2 px-4 border-2 border-green-700 rounded-md transition-colors duration-200"
                    >
                      <FaGithub className="w-5 h-5 mr-2" />
                      <span>Login with GitHub</span>
                    </motion.button>
                  </div>
                </div>
                <p className="text-xs mt-2 text-green-400">
                  Login to save your progress
                </p>
              </div>
              <div className="mb-8 max-w-md w-full">
                <h3 className="text-xl mb-4">Select a Category:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center justify-center p-4 border-2 rounded-md transition-colors duration-200 ${selectedCategory === category.name
                          ? "border-green-500 bg-green-500 bg-opacity-20"
                          : "border-green-700 hover:border-green-500"
                        }`}
                    >
                      <category.icon className="w-6 h-6 mr-2" />
                      <span>{category.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFindOpponent}
                disabled={!selectedCategory || loading}
                className={`inline-block text-lg py-4 px-8 rounded-md transition-colors duration-200 ease-in-out ${selectedCategory && !loading
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-green-800 text-green-200 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                    Loading...
                  </>
                ) : (
                  <> &gt;&gt; Find Opponent &lt;&lt; </>
                )}
              </motion.button>
            </motion.div>
          )
          : (
            <MatchFound
              category={selectedCategory}
              opponentsName={opponentsName}
              playerName={username || "GitHub User"}
              onCancel={() => setMatchFound(false)}
            />
          )}
      </main>

      <footer className="text-center mt-8 mb-4">
        <Link to="/" className="text-green-400 hover:text-green-300">
          &lt; Back to Home
        </Link>
        <p className="text-xs mt-2">
          ---------------------------------------
          <br />© {new Date().getFullYear()} CodeBattle. All rights reserved.
          <br />
          ---------------------------------------
        </p>
      </footer>
    </motion.div>
  );
}
