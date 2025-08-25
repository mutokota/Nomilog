import { useState } from "react";
import FormField from "../Components/ui/FormField";
import TextInput from "../Components/inputs/TextInput";
import Textarea from "../Components/inputs/Textarea";
import Select from "../Components/inputs/Select";
import TagInput from "../Components/inputs/TagInput";
import ImagePicker from "../Components/inputs/ImagePicker";
import MapPicker, { LatLngAcc } from "../Components/map/MapPicker";
import UseCurrentLocationButton from "../Components/inputs/UseCurrentLocationButton";
import HamburgerMenu from "../Components/ui/HamburgerMenu";
import DateInput from "../Components/inputs/DateInput";

const today = new Date().toISOString().split("T")[0];

type FormData = {
    name: string;
    comment: string;
    imageFile: File | null;
    tags: string[];
    categoryId: string;
    address: string;
    location?: LatLngAcc;
    visited_at: string;
};

export default function StoreFormPage() {
    const [data, setData] = useState<FormData>({
        name: "",
        comment: "",
        imageFile: null,
        tags: [],
        categoryId: "",
        address: "",
        visited_at: today,
    });
    const [saving, setSaving] = useState(false);

    const setField = <K extends keyof FormData>(k: K, v: FormData[K]) =>
        setData((d) => ({ ...d, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("保存データ", data);
        alert("保存しました");
    };

    return (
        <div className="min-h-screen bg-neutral-100 py-6">
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-sm rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ロゴ */}
                <div className="border-b border-neutral-200 px-3 py-1.2">
                    <div className="grid grid-cols-2 items-center">
                        <div className="flex justify-start">
                            <img
                                src="/images/Nomilog.png"
                                alt="Mapick"
                                className="h-20"
                            />
                        </div>
                        <div className="flex justify-end">
                            {/* 右上に配置 */}
                            <HamburgerMenu />
                        </div>
                    </div>
                </div>
                {/* Header */}
                <div className="border-neutral-200 px-4 py-3 text-[24px] text-neutral-500">
                    新規店舗登録
                </div>

                {/* Body */}
                <div className="space-y-4 px-4 py-4">
                    <FormField label="店舗名" required forId="storeName">
                        <TextInput
                            id="storeName"
                            name="storeName"
                            placeholder="店舗名を入力してください"
                            value={data.name}
                            onChange={(e) => setField("name", e.target.value)}
                        />
                    </FormField>

                    {/* 訪問日 */}
                    <FormField label="訪問日" required forId="visited_at">
                        <DateInput
                            name="visited_at"
                            id="visited_at"
                            value={data.visited_at}
                            onChange={(e) =>
                                setField(
                                    "visited_at",
                                    (e.target as HTMLInputElement).value
                                )
                            }
                            required
                        />
                    </FormField>

                    {/* コメント */}
                    <FormField label="コメント" forId="comment">
                        <Textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            placeholder="店舗についてのコメント"
                            value={data.comment}
                            onChange={(e) =>
                                setField("comment", e.target.value)
                            }
                        />
                    </FormField>

                    {/* 画像 */}
                    <FormField label="店舗画像" forId="image">
                        <ImagePicker
                            inputId="image"
                            inputName="image"
                            value={data.imageFile}
                            onChange={(f) => setField("imageFile", f)}
                            enableCamera={true}
                        />
                    </FormField>

                    {/* タグ */}
                    <FormField label="タグ" forId="tags">
                        <TagInput
                            inputId="tags"
                            inputName="tags"
                            value={data.tags}
                            onChange={(tags) => setField("tags", tags)}
                        />
                    </FormField>

                    {/* カテゴリ */}
                    <FormField label="カテゴリ" forId="address">
                        <Select
                            id="address"
                            name="address"
                            value={data.categoryId}
                            onChange={(e) =>
                                setField("categoryId", e.target.value)
                            }
                        >
                            <option value="">選択してください</option>
                            <option value="cafe">喫茶店</option>
                            <option value="lunch">ランチ</option>
                            <option value="dinner">ディナー</option>
                        </Select>
                    </FormField>

                    {/* 位置情報 */}
                    <FormField label="位置情報" required>
                        <TextInput
                            placeholder="住所を入力"
                            value={data.address}
                            onChange={(e) =>
                                setField("address", e.target.value)
                            }
                        />
                        <div className="mt-2">
                            <UseCurrentLocationButton
                                onLocated={(p) => setField("location", p)}
                            />
                        </div>
                        <div className="mt-2">
                            <MapPicker
                                value={data.location}
                                onChange={(p) => setField("location", p)}
                            />
                        </div>
                    </FormField>
                </div>

                {/* Footer */}
                <div className="flex gap-2 border-t border-neutral-200 px-4 py-3">
                    <button
                        type="button"
                        className="flex-1 rounded-md border border-neutral-300 bg-white py-2 text-[14px] text-neutral-800"
                    >
                        キャンセル
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 rounded-md bg-sky-600 py-2 text-[14px] text-white hover:bg-sky-700"
                    >
                        {saving ? "保存中…" : "保存"}
                    </button>
                </div>
            </form>
        </div>
    );
}
