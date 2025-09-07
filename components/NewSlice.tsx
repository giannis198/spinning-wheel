// interface SliceProps {
//   segment: string;
//   index: number;
//   segments: string[];
// }

// const NewSlice = ({ segment, index, segments }: SliceProps) => {
//   const segmentAngle = 360 / segments.length;
//   const rotation = segmentAngle * index;
//   const skewAngle = 90 - segmentAngle;

//   return (
//     <div
//       className="segment"
//       style={{
//         transform: `rotate(${rotation}deg) skewY(${skewAngle}deg)`,
//       }}
//     >
//       <span
//         className="text-sm"
//         style={{
//           transform: `skewY(${-skewAngle}deg) rotate(${segmentAngle / skewAngle - 0.4}deg)`,
//           transformOrigin: '100% 100%',
//           writingMode: 'vertical-rl',
//           textOrientation: 'mixed',
//           width: '100%',
//           position: 'absolute',
//         }}
//       >
//         {segment}
//       </span>
//     </div>
//   );
// };

// export default NewSlice;



interface SliceProps {
  segment: string;
  index: number;
  segments: string[];
}

const NewSlice = ({ segment, index, segments }: SliceProps) => {
  const segmentAngle = 360 / segments.length;
  const rotation = segmentAngle * index;
  const skewAngle = 90 - segmentAngle;

  // Special handling for exactly 2 segments
  if (segments.length === 2) {
    return (
      <div
        className="segment"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <span
          className="text-sm"
          style={{
            transform: `translateX(-50%) rotate(${index === 0 ? 0 : 180}deg)`,
            transformOrigin: 'center',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            position: 'absolute',
            left: '50%',
            top: index === 0 ? '25%' : '75%',
          }}
        >
          {segment}
        </span>
      </div>
    );
  }

  // Default handling for other cases
  return (
    <div
      className="segment"
      style={{
        transform: `rotate(${rotation}deg) skewY(${skewAngle}deg)`,
      }}
    >
      <span
        className="text-sm"
        style={{
          transform: `skewY(${-skewAngle}deg) rotate(${segmentAngle / skewAngle - 0.4}deg)`,
          transformOrigin: '87% 66%',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          width: '100%',
          position: 'absolute',
        }}
      >
        {segment}
      </span>
    </div>
  );
};

export default NewSlice;