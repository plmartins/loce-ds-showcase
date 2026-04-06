import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type Sparkle = { id: number; x: number; y: number; size: number; delay: number; duration: number; opacity: number; };
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const makeSparkle = (): Sparkle => ({ id: Math.random(), x: random(-10, 110), y: random(-10, 110), size: random(6, 12), delay: random(0, 4), duration: random(3, 5), opacity: random(0.4, 1) });

type SparklesTextProps = { children: React.ReactNode; className?: string; sparkleCount?: number; };

function SparklesText({ children, className, sparkleCount = 4 }: SparklesTextProps) {
    const [sparkles] = useState(() => Array.from({ length: sparkleCount }, makeSparkle));
    const colorRef = useRef("#f5a623");
    useEffect(() => { colorRef.current = "#f5a623"; }, []);

    return (
        <span className={cn("relative inline-block", className)}>
            {sparkles.map((s) => (
                <svg key={s.id} className="absolute pointer-events-none" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity, animation: `ai-sparkle ${s.duration}s ease-in-out ${s.delay}s infinite` }} viewBox="0 0 24 24" fill="none">
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" fill={colorRef.current} />
                </svg>
            ))}
            <span className="relative z-10">{children}</span>
        </span>
    );
}

export { SparklesText };
export type { SparklesTextProps };
