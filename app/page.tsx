"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useStore } from "@/lib/store";
import SpinWheel from "@/components/SpinWheel";
import Image from "next/image";
import logo from "@/public/logo.png"

export default function Home() {
  const showConfetti = useStore((state) => state.showConfetti);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track window size for confetti
  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10 space-y-10">
      <div className="w-48 h-48 flex gap-5 items-center">
        <Image src={logo} objectFit="contain" alt="elas" />
     
      </div>
      
   <h1 className="text-4xl font-bold text-sky-500">ΗΕLEXPO ΔΕΘ 2025</h1>
      <h2 className="text-4xl font-bold text-[#28449a]">Ελληνική Αστυνομία</h2>
      <h2 className="text-3xl font-semibold text-[#28449a]">Γυρίστε Τον Τροχό Για Να Κερδίσετε Δώρα!</h2>

      <SpinWheel />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
    </main>
  );
}
