import { inputBase } from "../ui/tokens";
type Option = { id: string; name: string };
type Props = {
    categories: Option[];
    value?: string;
    onChange: (id?: string) => void;
    className?: string;
};

export default function CategorySelect({
    categories,
    value,
    onChange,
    className,
}: Props) {
    return (
        <select
            className={`${inputBase} bg-white ${className ?? ""}`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || undefined)}
        >
            <option value="">カテゴリを選択</option>
            {categories.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}
