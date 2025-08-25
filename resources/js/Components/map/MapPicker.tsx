import { useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: shadow,
});

export type LatLngAcc = { lat: number; lon: number; acc?: number };

export default function MapPicker({
    value,
    onChange,
}: {
    value?: LatLngAcc;
    onChange: (p: LatLngAcc) => void;
}) {
    const center: [number, number] = value
        ? [value.lat, value.lon]
        : [35.681236, 139.767125];

    // MapContainer の子でのみ useMapEvents を呼ぶ
    const DraggableMarker = () => {
        const [pos, setPos] = useState<L.LatLng>(
            new L.LatLng(center[0], center[1])
        );
        const ref = useRef<L.Marker<any>>(null);

        useMapEvents({
            click(e) {
                setPos(e.latlng);
                onChange({
                    lat: e.latlng.lat,
                    lon: e.latlng.lng,
                    acc: value?.acc,
                });
            },
        });

        const handlers = useMemo(
            () => ({
                dragend() {
                    const m = ref.current;
                    if (!m) return;
                    const ll = m.getLatLng();
                    onChange({ lat: ll.lat, lon: ll.lng, acc: value?.acc });
                },
            }),
            [onChange, value?.acc]
        );

        return (
            <Marker
                draggable
                eventHandlers={handlers}
                position={pos}
                ref={ref as any}
            />
        );
    };

    return (
        <div className="relative overflow-hidden rounded-lg border border-neutral-300">
            <MapContainer
                center={center}
                zoom={17}
                style={{ height: 220, width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker />
            </MapContainer>
            <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-[11px] text-white">
                ピンをタップして位置を調整
            </div>
        </div>
    );
}
