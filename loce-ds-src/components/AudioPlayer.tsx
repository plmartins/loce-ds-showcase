import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "../lib/utils";

type AudioPlayerProps = { src: string; className?: string; variant?: "default" | "ai"; speed?: number; onSpeedChange?: () => void; onError?: () => void; };

const formatTime = (time: number) => { const m = Math.floor(time / 60); const s = Math.floor(time % 60); return `${m}:${s < 10 ? "0" : ""}${s}`; };

function AudioPlayer({ src, className, variant = "default", speed = 1, onSpeedChange, onError }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef(false);
    const seekedRef = useRef(false);
    const wasPlayingRef = useRef(false);
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState("0:00");

    const togglePlay = () => { const audio = audioRef.current; if (!audio) return; playing ? audio.pause() : audio.play(); };

    const seekTo = useCallback((clientX: number) => {
        const audio = audioRef.current; const bar = barRef.current;
        if (!audio || !bar || !audio.duration || isNaN(audio.duration)) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        let targetTime = ratio * audio.duration;
        if (targetTime > audio.duration - 0.5) targetTime = Math.max(0, audio.duration - 0.5);
        seekedRef.current = true;
        audio.currentTime = targetTime;
        const clampedRatio = targetTime / audio.duration;
        if (progressRef.current) progressRef.current.style.width = `${clampedRatio * 100}%`;
        setTime(formatTime(targetTime));
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent) => { e.stopPropagation(); draggingRef.current = true; wasPlayingRef.current = !audioRef.current?.paused; (e.target as HTMLElement).setPointerCapture(e.pointerId); seekTo(e.clientX); }, [seekTo]);
    const onPointerMove = useCallback((e: React.PointerEvent) => { e.stopPropagation(); if (!draggingRef.current) return; seekTo(e.clientX); }, [seekTo]);
    const onPointerUp = useCallback((e: React.PointerEvent) => {
        e.stopPropagation(); if (!draggingRef.current) return; draggingRef.current = false;
        const audio = audioRef.current; if (!audio) return;
        if (wasPlayingRef.current && audio.paused) audio.play();
        else if (!wasPlayingRef.current && !audio.paused) audio.pause();
    }, []);

    useEffect(() => { const audio = audioRef.current; if (!audio) return; audio.playbackRate = speed; }, [speed]);

    useEffect(() => {
        const audio = audioRef.current; if (!audio) return;
        const update = () => { if (!audio.duration || isNaN(audio.duration)) return; const pct = (audio.currentTime / audio.duration) * 100; if (progressRef.current) progressRef.current.style.width = `${pct}%`; setTime(formatTime(audio.currentTime)); if (!audio.paused) requestAnimationFrame(update); };
        const onMeta = () => { if (audio.duration === Infinity) { audio.currentTime = 1e101; audio.ontimeupdate = () => { audio.ontimeupdate = null; audio.currentTime = 0; setDuration(audio.duration); }; } else { setDuration(audio.duration); } };
        const onPlay = () => { setPlaying(true); requestAnimationFrame(update); };
        const onPause = () => setPlaying(false);
        const onEnd = () => { if (seekedRef.current) { seekedRef.current = false; return; } setPlaying(false); if (progressRef.current) progressRef.current.style.width = "0%"; setTime("0:00"); };
        const onSeeked = () => { setTimeout(() => { seekedRef.current = false; }, 100); };
        audio.addEventListener("loadedmetadata", onMeta); audio.addEventListener("play", onPlay); audio.addEventListener("pause", onPause); audio.addEventListener("ended", onEnd); audio.addEventListener("seeked", onSeeked);
        return () => { audio.removeEventListener("loadedmetadata", onMeta); audio.removeEventListener("play", onPlay); audio.removeEventListener("pause", onPause); audio.removeEventListener("ended", onEnd); audio.removeEventListener("seeked", onSeeked); };
    }, [src]);

    return (
        <div className={cn("flex items-center gap-3 p-2.5 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-white/[0.03] max-w-72", className)}>
            <button type="button" onClick={togglePlay} className="shrink-0 size-9 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-white/10 text-dark dark:text-light active:scale-95 duration-75">
                {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <div className="flex-1 min-w-0">
                <div ref={barRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
                    className="relative h-1.5 hover:h-2.5 w-full bg-neutral-100 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer transition-all duration-150 touch-none">
                    <div ref={progressRef} className={cn("absolute top-0 left-0 h-full rounded-full pointer-events-none", variant === "ai" ? "bg-loce" : "bg-dark dark:bg-light")} />
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-semibold text-neutral-400 tabular-nums">
                    <span className="min-w-7">{time}</span><span className="min-w-7 text-right">{formatTime(duration)}</span>
                </div>
            </div>
            {onSpeedChange && (
                <button type="button" onClick={onSpeedChange} className="shrink-0 h-6 px-2 text-[11px] font-bold text-neutral-600 dark:text-neutral-400 rounded-lg bg-neutral-100 dark:bg-white/10 active:scale-95 duration-75 tabular-nums">{speed}x</button>
            )}
            <audio ref={audioRef} src={src} preload="metadata" onError={onError} className="hidden" />
        </div>
    );
}

export { AudioPlayer };
export type { AudioPlayerProps };
