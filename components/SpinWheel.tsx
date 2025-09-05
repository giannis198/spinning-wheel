"use client";

import { useState } from "react";

import Slice from "./Slice";

import { useStore } from "@/lib/store";

const SpinWheel = () => {
  const segments = useStore((state) => state.segments);
    const setShowConfetti = useStore((state) => state.setShowConfetti);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);


  const spin = () => {
    setShowConfetti(false)
    if (spinning) return;

    setSpinning(true);
    setResult(null);

  
  const fullRotations = 360 * 5; // smooth spin with multiple rotations
  const randomExtra = Math.random() * 360; // random stop angle
  const newRotation = rotation + fullRotations + randomExtra;

  setRotation(newRotation);

  setTimeout(() => {
    const segmentAngle = 360 / segments.length;

    // Normalize final angle into [0, 360)
    const finalAngle = (newRotation % 360 + 360) % 360;

   // Because the wheel rotates clockwise, we invert the angle
  const adjustedAngle = (360 - finalAngle + 50) % 360;

     // Which slice contains 0°? → just floor division
  const winningIndex = Math.floor(adjustedAngle / segmentAngle);

   const winner = segments[winningIndex];

      // Update global store
      setResult(winner);
      setShowConfetti(true);

    setResult(segments[winningIndex]);
    setSpinning(false);
  }, 3000);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="marker"></div>
      <div
        className="wheel-container"
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {segments.map((segment, index) => (
          <Slice key={index} segment={segment} index={index} segments={segments} />
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-[#28449a]"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {result && <div className="mt-4 text-xl text-rose-500">
Συγχαρητήρια Κερδίσατε ένα {result} !!
      </div>}
     
    </div>
  );
};

export default SpinWheel;