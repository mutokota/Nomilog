import { useState } from "react";

export default function TagInput({
    value,
    onChange,
    placeholder = "タグを入力して追加ボタンで確定",
}: {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}) {
    const [text, setText] = useState("");

    const addTag = () => {
        const t = text.trim();
        if (!t) return;
        if (!value.includes(t)) {
            onChange([...value, t]);
        }
        setText(""); // 入力クリア
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    return (
        <div className="space-y-3">
            {/* 既存タグ */}
            <div className="flex flex-wrap gap-2">
                {value.map((t) => (
                    <span
                        key={t}
                        className="flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700"
                    >
                        {t}
                        <button
                            type="button"
                            className="ml-1 text-sky-500 hover:text-sky-700"
                            onClick={() => removeTag(t)}
                            aria-label={`${t} を削除`}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            {/* 入力欄 */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Enterでは追加しない
                    }
                }}
                placeholder={placeholder}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-sky-500 focus:ring-sky-500"
                aria-label="タグ入力"
            />

            {/* 追加ボタン（入力欄の下に表示） */}
            <button
                type="button"
                onClick={addTag}
                disabled={!text.trim()}
                className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
            >
                追加
            </button>
        </div>
    );
}
