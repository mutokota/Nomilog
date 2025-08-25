// resources/js/components/ui/HamburgerMenu.tsx
import { useEffect, useRef, useState } from "react";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    // 外側クリックで閉じる
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const Item = ({
        children,
        onClick,
    }: {
        children: React.ReactNode;
        onClick?: () => void;
    }) => (
        <button
            type="button"
            onClick={() => {
                onClick?.();
                setOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-[14px] text-neutral-800 hover:bg-neutral-50"
        >
            {children}
        </button>
    );

    return (
        <div className="relative z-20" ref={ref}>
            <button
                type="button"
                aria-label="メニューを開く"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
                {/* hamburger icon */}
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M4 7h16M4 12h16M4 17h16"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg ring-1 ring-black/5">
                    <Item>マイページ</Item>
                    <Item>設定</Item>
                    <div className="my-1 h-px bg-neutral-200" />
                    <Item onClick={() => console.log("logout")}>
                        ログアウト
                    </Item>
                </div>
            )}
        </div>
    );
}
