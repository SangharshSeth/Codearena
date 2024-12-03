import { useState, useEffect } from "react";
import { User, X } from "lucide-react";

interface MatchFoundProps {
  category: string;
  playerName: string;
  onCancel: () => void;
}

export default function MatchFound({
  category,
  playerName,
  onCancel,
}: MatchFoundProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="w-full max-w-md">
      <div className="border-2 border-green-500 rounded-lg p-6 relative">
        <h3 className="text-2xl mb-4">Match Found!</h3>
        <p className="text-green-400 mb-4">Category: {category}</p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <User className="w-6 h-6 mr-2" />
            <span>{playerName}</span>
          </div>
          <span className="text-2xl">VS</span>
          <div className="flex items-center">
            <User className="w-6 h-6 mr-2" />
            <span>Opponent</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl mb-2">Match starting in</p>
          <p className="text-4xl font-bold">{countdown}</p>
        </div>
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-green-500 hover:text-green-400"
          aria-label="Cancel match"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-4">
        <pre className="whitespace-pre-wrap text-center">
          {`
   _____          _         _____                     _
  / ____|        | |       |  __ \\                   | |
 | |     ___   __| | ___   | |__) |___  __ _ _ __ __| |
 | |    / _ \\ / _\` |/ _ \\  |  _  // _ \\/ _\` | '__/ _\` |
 | |___| (_) | (_| |  __/  | | \\ \\  __/ (_| | | | (_| |
  \\_____\\___/ \\__,_|\\___|  |_|  \\_\\___|\\__,_|_|  \\__,_|
`}
        </pre>
      </div>
    </div>
  );
}
