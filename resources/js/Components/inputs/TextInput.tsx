import { inputBase } from "../ui/tokens";

export default function TextInput(props: JSX.IntrinsicElements["input"]) {
    const { id, name, className, ...rest } = props;
    return (
        <input
            id={id ?? name} // ← 追加
            name={name} // ← 追加
            {...rest}
            className={`${inputBase} ${className ?? ""}`}
        />
    );
}
