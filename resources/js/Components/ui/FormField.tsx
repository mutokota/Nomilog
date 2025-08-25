import { ReactNode } from "react";
import { labelBase, helpText } from "../ui/tokens";

export default function FormField({
    label,
    required,
    children,
    forId,
}: {
    label: string;
    required?: boolean;
    helperText?: string;
    children: ReactNode;
    forId?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className={labelBase} htmlFor={forId}>
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            {children}
        </div>
    );
}
