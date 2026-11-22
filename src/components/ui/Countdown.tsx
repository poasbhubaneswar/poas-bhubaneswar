"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string | Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center rounded-xl border border-[#2D2D35] bg-[#141416]/90 px-3 py-2.5 sm:px-4 sm:py-3 shadow-md backdrop-blur-xs min-w-[64px] sm:min-w-[76px]"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold text-white font-mono">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#EF4444] font-semibold mt-0.5">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
