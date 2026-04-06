import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Text, type TextVariant } from "./Text";

type TextCopyProps = { text: string; variant?: TextVariant; className?: string; successDuration?: number; };

function TextCopy({ text, variant = "default", className, successDuration = 1500 }: TextCopyProps) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), successDuration); };
    if (!text) return null;
    return (
        <button type="button" onClick={handleCopy} className={cn("inline-flex items-center gap-1 group cursor-pointer active:scale-95 duration-75 transition-all", className)}>
            <Text variant={variant} className="group-hover:underline">{text}</Text>
            {copied ? <Check size={12} className="shrink-0 text-emerald-500" /> : <Copy size={12} className="shrink-0 opacity-0 group-hover:opacity-60 text-neutral-500 transition-opacity duration-150" />}
        </button>
    );
}

export { TextCopy };
export type { TextCopyProps };
