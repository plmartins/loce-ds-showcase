import { type ElementType, useEffect, useRef, useState, createElement } from "react";
import { cn } from "../lib/utils";

interface TextTypeProps { className?: string; showCursor?: boolean; hideCursorWhileTyping?: boolean; cursorCharacter?: string | React.ReactNode; cursorBlinkDuration?: number; cursorClassName?: string; text: string | string[]; as?: ElementType; typingSpeed?: number; initialDelay?: number; pauseDuration?: number; deletingSpeed?: number; loop?: boolean; textColors?: string[]; variableSpeed?: { min: number; max: number }; onSentenceComplete?: (sentence: string, index: number) => void; startOnVisible?: boolean; reverseMode?: boolean; }

function TextType({ text, as: Component = "div", typingSpeed = 50, initialDelay = 0, pauseDuration = 2000, deletingSpeed = 30, loop = true, className = "", showCursor = true, hideCursorWhileTyping = false, cursorCharacter = "|", cursorClassName = "", cursorBlinkDuration = 0.5, variableSpeed, onSentenceComplete, startOnVisible = false, reverseMode = false, ...props }: TextTypeProps & React.HTMLAttributes<HTMLElement>) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const textArray = Array.isArray(text) ? text : [text];

    const getRandomSpeed = () => { if (!variableSpeed) return typingSpeed; const { min, max } = variableSpeed; return Math.random() * (max - min) + min; };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setIsVisible(true); }); }, { threshold: 0.1 });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (!isVisible) return;
        let timeout: ReturnType<typeof setTimeout>;
        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;
        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === "") {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;
                    if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => {}, pauseDuration);
                } else {
                    timeout = setTimeout(() => setDisplayedText((prev) => prev.slice(0, -1)), deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(() => { setDisplayedText((prev) => prev + processedText[currentCharIndex]); setCurrentCharIndex((prev) => prev + 1); }, variableSpeed ? getRandomSpeed() : typingSpeed);
                } else if (textArray.length > 1) {
                    timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };
        if (currentCharIndex === 0 && !isDeleting && displayedText === "") { timeout = setTimeout(executeTypingAnimation, initialDelay); } else { executeTypingAnimation(); }
        return () => clearTimeout(timeout);
    }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible, reverseMode, variableSpeed, onSentenceComplete]);

    useEffect(() => { setDisplayedText(""); setCurrentCharIndex(0); setIsDeleting(false); setCurrentTextIndex(0); }, [text]);

    const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(Component, { ref: containerRef, className: cn("inline-block whitespace-pre-wrap tracking-tight", className), ...props },
        <span className="inline text-dark dark:text-light">{displayedText}</span>,
        showCursor && <span ref={cursorRef} className={cn("ml-1 inline-block", shouldHideCursor && "hidden", cursorClassName)} style={{ animation: `texttype-blink ${cursorBlinkDuration * 2}s ease-in-out infinite` }}>{cursorCharacter}</span>
    );
}

export { TextType };
export type { TextTypeProps };
