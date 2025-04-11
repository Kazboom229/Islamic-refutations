import { useState, useEffect } from "react";

export default function CollaborationIndicator() {
  const [isActive, setIsActive] = useState(false);
  
  // Simulate real-time collaboration activity
  useEffect(() => {
    const simulateActivity = () => {
      if (Math.random() > 0.5) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 800);
      }
    };
    
    const interval = setInterval(simulateActivity, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 flex items-center bg-primary rounded-full px-4 py-2 text-white shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
      <span className="text-sm font-medium">Synced with Team</span>
    </div>
  );
}
