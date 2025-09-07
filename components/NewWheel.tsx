// "use client";

// import { useState } from "react";
// import { useStore } from "@/lib/store";
// import NewSlice from "./NewSlice";

// const NewWheel = () => {
//   const segments = useStore((state) => state.segments);
//   const setShowConfetti = useStore((state) => state.setShowConfetti);

//   const [spinning, setSpinning] = useState(false);
//   const [rotation, setRotation] = useState(0);
//   const [result, setResult] = useState<string | null>(null);

//   // Calculate conic gradient based on current segments
//   const segmentAngle = 360 / segments.length;
//   const wheelBackground = `conic-gradient(
//     ${segments.map((_, i) => 
//       `hsl(${(i * 360) / segments.length}, 70%, 50%) ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
//     ).join(', ')}
//   )`;

//   const spin = () => {
//     setShowConfetti(false)
//     if (spinning) return;

//     setSpinning(true);
//     setResult(null);

//     // Generate random number of rotations between 5 and 10
//     const randomRotations = Math.floor(Math.random() * 6) + 5; // 5-10 rotations
//     const fullRotations = 360 * randomRotations; // smooth spin with random rotations
//     const randomExtra = Math.random() * 360; // random stop angle
//     const newRotation = rotation + fullRotations + randomExtra;

//     setRotation(newRotation);

//     setTimeout(() => {
//       // Normalize final angle into [0, 360)
//       const finalAngle = (newRotation % 360 + 360) % 360;

//       // Because the wheel rotates clockwise, we invert the angle
//       const adjustedAngle = (360 - finalAngle + 50) % 360;

//       // Which slice contains 0°? → just floor division
//       const winningIndex = Math.floor(adjustedAngle / segmentAngle);
//       console.log(winningIndex);

//       const winner = segments[winningIndex];

//       // Update global store
//       setResult(winner);
//       setShowConfetti(true);

//       setSpinning(false);
//     }, 3000);
//   };



//   return (
//     <div className="flex flex-col items-center relative">
//       <div className="marker" />
//       <div
//         className="wheel-container"
//         style={{
//           transform: `rotate(${rotation}deg)`,
//           background: wheelBackground,
//         }}
//       >
//         {segments.map((segment, index) => (
//           <NewSlice
//             key={index}
//             segment={segment}
//             index={index}
//             segments={segments}
//           />
//         ))}
//       </div>

//       {/* {result && (
//         <div className="mt-4 text-2xl font-bold text-rose-500">
//           Συγχαρητήρια Κερδίσατε {result} !!
//         </div>
//       )} */}

//       <button
//         onClick={spin}
//         disabled={spinning}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-[#28449a]"
//       >
//         {spinning ? "Spinning..." : "Spin"}
//       </button>


      
//     </div>
//   );
// };

// export default NewWheel;



"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import NewSlice from "./NewSlice";

const NewWheel = () => {
  const segments = useStore((state) => state.segments);
  const setShowConfetti = useStore((state) => state.setShowConfetti);
  const setResult = useStore((state) => state.setResult);

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Calculate conic gradient based on current segments
  const segmentAngle = segments.length > 0 ? 360 / segments.length : 0;
  
  // Special handling for 2 segments
  let wheelBackground = 'transparent';
  if (segments.length > 0) {
    if (segments.length === 2) {
      wheelBackground = `conic-gradient(
        hsl(0, 70%, 50%) 0deg 180deg,
        hsl(180, 70%, 50%) 180deg 360deg
      )`;
    } else {
      wheelBackground = `conic-gradient(
        ${segments.map((_, i) => 
          `hsl(${(i * 360) / segments.length}, 70%, 50%) ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
        ).join(', ')}
      )`;
    }
  }

  const spin = () => {
    setShowConfetti(false)
    if (spinning || segments.length === 0) return;

    setSpinning(true);
    setResult(null);

    const randomRotations = Math.floor(Math.random() * 6) + 5;
    const fullRotations = 360 * randomRotations;
    const randomExtra = Math.random() * 360;
    const newRotation = rotation + fullRotations + randomExtra;

    setRotation(newRotation);

    setTimeout(() => {
      const finalAngle = (newRotation % 360 + 360) % 360;
      const adjustedAngle = (360 - finalAngle) % 360;
      const winningIndex = Math.floor(adjustedAngle / segmentAngle) % segments.length;
      
      const winner = segments[winningIndex];
      setResult(winner);
      setShowConfetti(true);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="marker" />
      <div
        className="wheel-container"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: wheelBackground,
          transition: 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {segments.map((segment, index) => (
          <NewSlice
            key={index}
            segment={segment}
            index={index}
            segments={segments}
          />
        ))}
      </div>

      <button
        onClick={spin}
        disabled={spinning || segments.length === 0}
        className="mt-4 px-6 py-4 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};

export default NewWheel;