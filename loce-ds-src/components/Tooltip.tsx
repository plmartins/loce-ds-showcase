import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";

type TooltipProps = {
    children: ReactNode;
    content: string;
    position?: "top" | "right" | "bottom" | "left";
    className?: string;
    wrap?: boolean;
    maxWidth?: string;
};

function Tooltip({ children, content, position = "top", className, wrap = false, maxWidth = "max-w-xs" }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, transform: "" });
    const triggerRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        const el = triggerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const gap = 8;
        const map = {
            top: { top: r.top - gap, left: r.left + r.width / 2, transform: "translate(-50%, -100%)" },
            bottom: { top: r.bottom + gap, left: r.left + r.width / 2, transform: "translate(-50%, 0)" },
            left: { top: r.top + r.height / 2, left: r.left - gap, transform: "translate(-100%, -50%)" },
            right: { top: r.top + r.height / 2, left: r.right + gap, transform: "translate(0, -50%)" },
        };
        setCoords(map[position]);
    };

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        if (!visible) return;
        updatePosition();
        const handler = () => updatePosition();
        window.addEventListener("resize", handler);
        window.addEventListener("scroll", handler, true);
        return () => { window.removeEventListener("resize", handler); window.removeEventListener("scroll", handler, true); };
    }, [visible, position]);

    if (!content) return <>{children}</>;

    return (
        <div className="relative inline-flex">
            <div ref={triggerRef} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>{children}</div>
            {mounted && visible && createPortal(
                <div style={{ top: coords.top, left: coords.left, transform: coords.transform }}
                    className={cn("fixed z-[100] px-3 py-1.5 text-xs font-medium rounded-2xl shadow-lg pointer-events-none",
                        "text-neutral-600 dark:text-neutral-300", "bg-white dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-700",
                        wrap ? `whitespace-normal break-words ${maxWidth}` : "whitespace-nowrap", className
                    )}
                >{content}</div>,
                document.body
            )}
        </div>
    );
}

export { Tooltip };
export type { TooltipProps };
