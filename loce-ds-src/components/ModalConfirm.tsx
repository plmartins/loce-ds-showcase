import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../primitives/dialog";
import { Button } from "./Button";

type ModalConfirmProps = { open: boolean; onClose: () => void; onConfirm: () => void; title: string; description?: string; children?: React.ReactNode; confirmLabel?: string; cancelLabel?: string; confirmIcon?: React.ReactNode; variant?: "primary" | "destructive"; isLoading?: boolean; };

function ModalConfirm({ open, onClose, onConfirm, title, description, children, confirmLabel = "Confirmar", cancelLabel = "Cancelar", confirmIcon, variant = "primary", isLoading = false }: ModalConfirmProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="space-y-0 outline-none">
                <DialogHeader><DialogTitle>{title}</DialogTitle>{description && <DialogDescription>{description}</DialogDescription>}</DialogHeader>
                {children && <div className="py-2">{children}</div>}
                <DialogFooter className="flex justify-end gap-3">
                    {!isLoading && <Button variant="secondary" className="px-6" onClick={onClose}>{cancelLabel}</Button>}
                    <Button variant={variant} className="px-8" onClick={onConfirm} loading={isLoading}>{!isLoading && confirmIcon}{isLoading ? "Processando..." : confirmLabel}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { ModalConfirm };
export type { ModalConfirmProps };
