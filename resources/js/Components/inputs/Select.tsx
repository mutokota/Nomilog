import { inputBase } from "../ui/tokens";

export default function Select(props: JSX.IntrinsicElements["select"]) {
    const { id, name, className, ...rest } = props;
    return (
        <select
            id={id ?? name} // ← 追加
            name={name} // ← 追加
            {...rest}
            className={`${inputBase} bg-white ${className ?? ""}`}
        />
    );
}
