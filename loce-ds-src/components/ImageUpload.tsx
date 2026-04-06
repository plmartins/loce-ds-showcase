import { useRef, useState } from "react";
import { ImagePlus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

type ImageUploadProps = { label: string; value: string; onChange: (url: string) => void; uploadFn?: (file: File) => Promise<{ url: string }>; aspect?: "square" | "wide"; placeholder?: string; accept?: string; className?: string; };

function ImageUpload({ label, value, onChange, uploadFn, aspect = "square", placeholder, accept = "image/*", className }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith("image/")) return;
        setUploading(true);
        if (!uploadFn) return;
        try { const result = await uploadFn(file); onChange(result.url); } catch { /* handled by consumer */ } finally { setUploading(false); }
    };

    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>
            {value ? (
                <div className="flex items-center gap-3 p-3 h-24 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 bg-neutral-50 dark:bg-white/[0.03]">
                    <img src={value} alt={label} className={cn("object-cover rounded-xl", aspect === "square" ? "size-16" : "h-16 w-24")} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="flex flex-col gap-1">
                        <Button type="button" variant="ghost" size="sm" className="justify-start text-neutral-500" onClick={() => inputRef.current?.click()}><RefreshCw size={14} /> Trocar</Button>
                        <Button type="button" variant="ghost" size="sm" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={() => onChange("")}><Trash2 size={14} /> Remover</Button>
                    </div>
                </div>
            ) : (
                <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} disabled={uploading}
                    className={cn("group flex flex-row items-center justify-center gap-3 h-24 rounded-2xl border-2 border-dashed transition-all cursor-pointer px-4",
                        dragOver ? "border-loce bg-loce/5 scale-[1.01]" : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-white/[0.02]"
                    )}>
                    <div className={cn("flex items-center justify-center size-10 rounded-2xl ring-1 transition-colors",
                        dragOver ? "bg-loce/10 ring-loce/20 text-loce" : "bg-neutral-100 dark:bg-white/5 ring-neutral-200 dark:ring-neutral-700 text-neutral-400 group-hover:text-neutral-500"
                    )}>{uploading ? <Loader2 size={22} className="animate-spin" /> : <ImagePlus size={22} />}</div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">{uploading ? "Enviando..." : placeholder || "Clique ou arraste uma imagem"}</span>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">PNG, JPG ou SVG</span>
                    </div>
                </button>
            )}
            <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); e.target.value = ""; }} />
        </div>
    );
}

export { ImageUpload };
export type { ImageUploadProps };
