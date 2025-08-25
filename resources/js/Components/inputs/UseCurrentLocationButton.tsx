import { useState } from "react";
import type { LatLngAcc } from "../map/MapPicker";

export default function UseCurrentLocationButton({
    onLocated,
}: {
    onLocated: (p: LatLngAcc) => void;
}) {
    const [loading, setLoading] = useState(false);
    const locate = () => {
        if (!("geolocation" in navigator)) return alert("未対応");
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLoading(false);
                onLocated({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                });
            },
            (err) => {
                setLoading(false);
                alert(err.message);
            }
        );
    };
    return (
        <button
            type="button"
            onClick={locate}
            className="rounded-md border border-sky-300 bg-white px-3 py-1.5 text-[13px] text-sky-700"
        >
            {loading ? "取得中…" : "現在地から取得"}
        </button>
    );
}
