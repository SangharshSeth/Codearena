import { Terminal, Zap, Trophy, Users } from 'lucide-react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-between bg-black text-green-500 font-mono p-4 relative overflow-hidden"
    >
      {/* Subtle glassmorphism background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-green-700/10 backdrop-blur-[100px] pointer-events-none" />
      
      <header className="text-center mt-8 flex flex-col items-center justify-center relative z-10">
        <div className="flex items-center">
          <Terminal className="w-10 h-10 mr-2 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold font-sans">
            CodeBattle
          </h1>
        </div>
        <h2 className="text-sm md:text-base font-sans mt-2 text-green-400">
          1v1 Tech Showdown
        </h2>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-md text-left"
        >
          <pre className="whitespace-pre-wrap">{`+-------------------------------------+
|                                     |
|  * Test your coding skills in       |
|    real-time battles                |
|                                     |
|  * Challenge opponents worldwide    |
|                                     |
|  * Climb the global leaderboard     |
|                                     |
+-------------------------------------+`}</pre>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/app/find-match"
            className="inline-block bg-green-500 text-black hover:bg-green-400 text-lg py-6 px-8 mb-8 rounded-md transition-colors duration-200 ease-in-out"
          >
            &gt;&gt; Find Match &lt;&lt;
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-md text-left"
        >
          <pre className="whitespace-pre-wrap text-center">
{` 
     |\\__/,|   (\`\\
   _.o o  \\\\_.   /
  -(((---(((--------`}
          </pre>
        </motion.div>
      </main>
      
      <footer className="text-center mt-8 mb-4 relative z-10">
        <p className="text-xs">
          ---------------------------------------
          <br />© {new Date().getFullYear()} CodeBattle. All rights reserved.
          <br />
          ---------------------------------------
        </p>
      </footer>
    </motion.div>
  );
}