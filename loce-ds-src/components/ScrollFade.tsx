import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

type ScrollFadeProps = { children: React.ReactNode; className?: string; fadeHeight?: number; position?: "bottom" | "top" | "both"; };

function ScrollFade({ children, className, fadeHeight = 60, position = "bottom" }: ScrollFadeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    const check = useCallback(() => {
        const el = ref.current; if (!el) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        setShowTop(scrollTop > 10); setShowBottom(scrollHeight - scrollTop - clientHeight > 10);
    }, []);

    useEffect(() => {
        const el = ref.current; if (!el) return;
        check(); el.addEventListener("scroll", check, { passive: true });
        const observer = new ResizeObserver(check); observer.observe(el);
        return () => { el.removeEventListener("scroll", check); observer.disconnect(); };
    }, [check]);

    const showTopFade = (position === "top" || position === "both") && showTop;
    const showBottomFade = (position === "bottom" || position === "both") && showBottom;

    return (
        <div className="relative flex-1 min-h-0">
            {showTopFade && <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none" style={{ height: fadeHeight, background: "linear-gradient(to bottom, var(--bg, #fff), transparent)", backdropFilter: `blur(${fadeHeight / 6}px)`, mask: "linear-gradient(to bottom, black, transparent)", WebkitMask: "linear-gradient(to bottom, black, transparent)" }} />}
            <div ref={ref} className={cn("h-full overflow-y-auto", className)}>{children}</div>
            {showBottomFade && <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={{ height: fadeHeight, background: "linear-gradient(to top, var(--bg, #fff), transparent)", backdropFilter: `blur(${fadeHeight / 6}px)`, mask: "linear-gradient(to top, black, transparent)", WebkitMask: "linear-gradient(to top, black, transparent)" }} />}
        </div>
    );
}

export { ScrollFade };
export type { ScrollFadeProps };
