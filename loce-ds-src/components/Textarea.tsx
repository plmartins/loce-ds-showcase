import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

type TextareaProps = Omit<React.ComponentProps<"textarea">, "onChange"> & {
    label?: string;
    loading?: boolean;
    error?: string;
    autoResize?: boolean;
    onSubmit?: () => void;
    onChange?: (value: string) => void;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, loading, error, autoResize = true, onSubmit, onChange, ...props }, ref) => {
        const internalRef = useRef<HTMLTextAreaElement>(null);
        useImperativeHandle(ref, () => internalRef.current!);

        const resize = () => {
            const el = internalRef.current;
            if (!el || !autoResize) return;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
        };

        const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e.target.value);
            resize();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey && onSubmit) {
                e.preventDefault();
                onSubmit();
                setTimeout(resize, 50);
            }
        };

        useEffect(() => { resize(); }, [props.value]);

        return (
            <div className="w-full flex flex-col gap-1">
                {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
                <div className="w-full flex items-center relative">
                    <textarea
                        ref={internalRef} rows={1}
                        className={cn(
                            "w-full text-sm font-semibold py-2 px-4 rounded-2xl resize-none",
                            "bg-neutral-100 dark:bg-white/5", "text-neutral-800 dark:text-neutral-100",
                            "ring-1 ring-neutral-300 dark:ring-neutral-600",
                            "outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 placeholder:font-medium",
                            "disabled:opacity-50 disabled:ring-0",
                            "focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-2 transition-shadow duration-100",
                            autoResize && "max-h-40",
                            error && "ring-red-400 dark:ring-red-500 focus:ring-red-400",
                            className
                        )}
                        onChange={handleInput} onKeyDown={handleKeyDown} {...props}
                    />
                    {loading && <Loader2 size={14} className="absolute right-3 text-neutral-400 animate-spin" />}
                </div>
                {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
