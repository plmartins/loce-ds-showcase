import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MousePointerClick, Hand, Mouse } from "lucide-react";
import { cn } from "../lib/utils";

type ImageWithZoomProps = { src: string; fallbackSrc?: string; fallbackClassName?: string; width: number; height: number; className?: string; onLoad?: () => void; onError?: () => void; isDisabled?: boolean; };

function ImageWithZoom({ src, fallbackSrc, fallbackClassName, width, height, className, onLoad, onError, isDisabled }: ImageWithZoomProps) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isFallback, setIsFallback] = useState(false);
    const [open, setOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const translateStart = useRef({ x: 0, y: 0 });
    const portalContainer = useMemo(() => { const el = document.createElement("div"); el.className = "image-zoom-portal"; return el; }, []);

    useEffect(() => { document.body.appendChild(portalContainer); return () => { document.body.removeChild(portalContainer); }; }, [portalContainer]);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        const prevPaddingRight = document.body.style.paddingRight;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKeyDown);
        return () => { document.body.style.overflow = prevOverflow; document.body.style.paddingRight = prevPaddingRight; window.removeEventListener("keydown", onKeyDown); };
    }, [open]);

    useEffect(() => { setCurrentSrc(src); setIsFallback(false); }, [src]);

    const handleError = () => { if (fallbackSrc && currentSrc !== fallbackSrc) { setCurrentSrc(fallbackSrc); setIsFallback(true); } onError?.(); };

    if (isDisabled) {
        return <img src={currentSrc} alt="Imagem" width={width} height={height} className={cn(className, isFallback && fallbackClassName)} onLoad={onLoad} onError={handleError} />;
    }

    return (
        <>
            <img src={currentSrc} alt="Imagem" width={width} height={height} className={cn("cursor-zoom-in", className, isFallback && fallbackClassName)} onLoad={onLoad} onError={handleError}
                onClick={() => { setOpen(true); setScale(1); setTranslate({ x: 0, y: 0 }); }} />
            {open && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onWheel={(e) => e.preventDefault()} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}
                    onClick={() => { setOpen(false); setScale(1); setTranslate({ x: 0, y: 0 }); }}>
                    <img src={currentSrc} alt="Imagem ampliada" onError={handleError} className="max-h-[90vh] max-w-[90vw] select-none rounded-xl"
                        onClick={(e) => e.stopPropagation()}
                        onWheel={(e) => { e.preventDefault(); const delta = -e.deltaY * 0.0015; setScale((prev) => { const next = Math.min(4, Math.max(1, prev + delta)); if (next === 1) setTranslate({ x: 0, y: 0 }); return Number(next.toFixed(3)); }); }}
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(true); dragStart.current = { x: e.clientX, y: e.clientY }; translateStart.current = { ...translate }; }}
                        onMouseMove={(e) => { if (!dragging || scale === 1) return; const dx = e.clientX - dragStart.current.x; const dy = e.clientY - dragStart.current.y; setTranslate({ x: translateStart.current.x + dx, y: translateStart.current.y + dy }); }}
                        onDoubleClick={(e) => { e.stopPropagation(); if (scale > 1) { setScale(1); setTranslate({ x: 0, y: 0 }); } else { setScale(2); } }}
                        style={{ transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`, transformOrigin: "center", cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in", transition: dragging ? "none" : "transform 120ms ease-out" }}
                    />
                    <div className="pointer-events-none absolute bottom-6 left-6 flex w-max select-none flex-col gap-2 rounded-2xl bg-black/50 px-3 py-3 text-[11px] font-medium text-neutral-400 shadow-lg">
                        <div className="flex items-center gap-2"><MousePointerClick size={16} /><span>Duplo clique para aproximar ou resetar</span></div>
                        <div className="flex items-center gap-2"><Mouse size={16} /><span>Use o scroll para zoom suave</span></div>
                        <div className="flex items-center gap-2"><Hand size={16} /><span>Arraste a imagem para mover</span></div>
                    </div>
                </div>,
                portalContainer
            )}
        </>
    );
}

export { ImageWithZoom };
export type { ImageWithZoomProps };
