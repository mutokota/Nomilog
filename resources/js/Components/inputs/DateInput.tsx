// resources/js/components/forms/DateInput.tsx
import { inputBase } from "../ui/tokens";

type Props = Omit<JSX.IntrinsicElements["input"], "type"> & {
    /** 例: visited_at */
    name: string;
    /** 例: visited_at（省略時は name を使用） */
    id?: string;
};

export default function DateInput({ id, name, className, ...rest }: Props) {
    return (
        <input
            id={id ?? name}
            name={name}
            type="date"
            className={`${inputBase} ${className ?? ""}`}
            {...rest}
        />
    );
}
