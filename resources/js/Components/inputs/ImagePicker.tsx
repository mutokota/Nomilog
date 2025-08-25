// resources/js/components/forms/ImagePicker.tsx
import { useEffect, useRef, useState } from "react";

export default function ImagePicker({
    value,
    onChange,
    inputId,
    inputName,
    accept = "image/*",
    maxSizeMB = 10,
    enableCamera = true, // カメラ起動を有効化するか
}: {
    value: File | null;
    onChange: (f: File | null) => void;
    inputId?: string;
    inputName?: string;
    accept?: string;
    maxSizeMB?: number;
    enableCamera?: boolean;
}) {
    const [preview, setPreview] = useState<string>();
    const [fileName, setFileName] = useState<string>("");
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string>("");

    // 参照：通常選択用 / カメラ起動用
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const cameraInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!value) {
            setPreview(undefined);
            setFileName("");
            return;
        }
        const u = URL.createObjectURL(value);
        setPreview(u);
        setFileName(value.name);
        return () => URL.revokeObjectURL(u);
    }, [value]);

    const applyFile = (f: File | null | undefined) => {
        setError("");
        if (!f) return;
        if (f.size > maxSizeMB * 1024 * 1024) {
            setError(`ファイルサイズが大きすぎます（最大 ${maxSizeMB}MB）`);
            return;
        }
        if (
            accept !== "*" &&
            !new RegExp(accept.replace("*", ".*")).test(f.type)
        ) {
            setError("対応していないファイル形式です");
            return;
        }
        onChange(f);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        applyFile(f);
    };

    return (
        <div className="space-y-2">
            {/* ドロップゾーン（クリックでも開く） */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                aria-label="画像を選択またはドロップ"
                className={[
                    "relative aspect-[4/3] w-full overflow-hidden rounded-lg border transition",
                    dragOver
                        ? "border-sky-500 ring-2 ring-sky-200"
                        : "border-neutral-300",
                    preview ? "bg-black" : "bg-neutral-50",
                ].join(" ")}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="プレビュー"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-600">
                        <div className="flex gap-8">
                            <button
                                type="button"
                                className="rounded-md bg-sky-600 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-sky-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                            >
                                画像を選択
                            </button>
                            {enableCamera && (
                                <button
                                    type="button"
                                    className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-[13px] hover:bg-neutral-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        cameraInputRef.current?.click(); // スマホでカメラ起動
                                    }}
                                >
                                    カメラで撮影
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ファイル名と操作 */}
            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 text-[12px] text-neutral-600">
                    {fileName ? (
                        <span className="inline-block max-w-[16rem] truncate align-middle">
                            {fileName}
                        </span>
                    ) : (
                        <span className="text-neutral-400">未選択</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {value && (
                        <button
                            type="button"
                            className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-[12px] hover:bg-neutral-50"
                            onClick={() => onChange(null)}
                        >
                            クリア
                        </button>
                    )}
                    <button
                        type="button"
                        className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-[12px] hover:bg-neutral-50"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        変更
                    </button>
                </div>
            </div>

            {/* エラー表示 */}
            {error && <p className="text-[12px] text-red-600">{error}</p>}

            {/* 実体の input（視覚的非表示） */}
            <input
                ref={fileInputRef}
                id={inputId ?? inputName}
                name={inputName}
                type="file"
                accept={accept}
                className="sr-only"
                onChange={(e) => applyFile(e.target.files?.[0] ?? null)}
            />
            {/* カメラ起動用 input（スマホ対応ブラウザでカメラが開く） */}
            {enableCamera && (
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment" // 背面カメラ優先（iOS/Android）
                    className="sr-only"
                    onChange={(e) => applyFile(e.target.files?.[0] ?? null)}
                />
            )}
        </div>
    );
}
