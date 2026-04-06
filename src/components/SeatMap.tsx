import { useState } from 'react';
import { motion } from 'motion/react';

interface SeatMapProps {
  onSeatSelect: (seats: string[]) => void;
}

export const SeatMap = ({ onSeatSelect }: SeatMapProps) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Mock occupied seats
  const occupiedSeats = ['C4', 'C5', 'D6', 'E2', 'E3', 'F8'];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    
    const newSelection = selectedSeats.includes(seatId)
      ? selectedSeats.filter(s => s !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelection);
    onSeatSelect(newSelection);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      {/* Screen */}
      <div className="relative w-full max-w-2xl h-8 mb-12">
        <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full" />
        <div className="absolute inset-0 border-t-4 border-secondary/40 rounded-[100%] scale-x-110" />
        <p className="text-center text-[10px] tracking-[0.5em] text-secondary/60 uppercase mt-8">Screen</p>
      </div>

      {/* Seats */}
      <div className="grid gap-4">
        {rows.map(row => (
          <div key={row} className="flex gap-3 items-center">
            <span className="w-6 text-xs text-on-surface-variant font-bold">{row}</span>
            <div className="flex gap-3">
              {cols.map(col => {
                const seatId = `${row}${col}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                return (
                  <motion.button
                    key={seatId}
                    whileHover={!isOccupied ? { scale: 1.2 } : {}}
                    whileTap={!isOccupied ? { scale: 0.9 } : {}}
                    onClick={() => toggleSeat(seatId)}
                    className={`
                      w-6 h-6 rounded-md transition-all duration-300
                      ${isOccupied ? 'bg-surface-container-lowest/30 cursor-not-allowed' : 
                        isSelected ? 'bg-secondary neon-glow-secondary' : 'bg-surface-container-highest hover:bg-surface-bright'}
                    `}
                  />
                );
              })}
            </div>
            <span className="w-6 text-xs text-on-surface-variant font-bold">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-surface-container-highest" />
          <span className="text-xs text-on-surface-variant">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-secondary neon-glow-secondary" />
          <span className="text-xs text-on-surface-variant">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-surface-container-lowest/30" />
          <span className="text-xs text-on-surface-variant">Occupied</span>
        </div>
      </div>
    </div>
  );
};
