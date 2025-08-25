import { inputBase } from "../ui/tokens";

export default function Textarea(props: JSX.IntrinsicElements["textarea"]) {
    const { id, name, className, ...rest } = props;
    return (
        <textarea
            id={id ?? name} // ← 追加
            name={name} // ← 追加
            {...rest}
            className={`${inputBase} resize-none ${className ?? ""}`}
        />
    );
}
