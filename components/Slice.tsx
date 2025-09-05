"use client";

interface SliceProps {
  segment: string;
  index: number;
  segments: string[];
}

const Slice = ({ segment, index, segments }: SliceProps) => {
  const segmentAngle = 360 / segments.length;
  const rotation = segmentAngle * index;
  const skewAngle = 90 - segmentAngle;

  return (
    <div
      className="segment"
      style={{
        transform: `rotate(${rotation}deg) skewY(${skewAngle}deg)`,
        backgroundColor: `hsl(${rotation}, 70%, 50%)`,
      }}
    >
      <span
      className="text-sm"
        style={{
          transform: `skewY(${-skewAngle}deg) rotate(${segmentAngle / skewAngle - 0.4 }deg)`,
          transformOrigin: '100% 100%',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          textAlign: 'center',
          width: '100%',
          position: 'absolute',
        }}
      >
        {segment}
      </span>
    </div>
  );
};

export default Slice;