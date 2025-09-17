import React from "react";
import { Card } from "./ui/card";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  status: "open" | "in-progress" | "resolved";
  category: string;
  priority: "low" | "medium" | "high";
}

const mockMarkers: MapMarker[] = [
  { id: "1", lat: 17.385, lng: 78.4867, status: "open", category: "Pothole", priority: "high" },
  { id: "2", lat: 17.44, lng: 78.48, status: "in-progress", category: "Street Light", priority: "medium" },
  { id: "3", lat: 17.42, lng: 78.52, status: "resolved", category: "Graffiti", priority: "low" },
  { id: "4", lat: 17.36, lng: 78.50, status: "open", category: "Traffic Signal", priority: "high" },
  { id: "5", lat: 17.39, lng: 78.54, status: "in-progress", category: "Water Main", priority: "high" },
  { id: "6", lat: 17.33, lng: 78.45, status: "open", category: "Sidewalk", priority: "medium" },
  { id: "7", lat: 17.41, lng: 78.47, status: "resolved", category: "Noise Complaint", priority: "low" },
  { id: "8", lat: 17.37, lng: 78.49, status: "open", category: "Pothole", priority: "medium" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved":
      return CheckCircle2;
    case "in-progress":
      return Clock;
    default:
      return AlertCircle;
  }
};

interface CityMapViewProps {
  onMarkerClick: (markerId: string) => void;
}

export function CityMapView({ onMarkerClick }: CityMapViewProps) {
  const center: [number, number] = [17.385, 78.4867];

  return (
    <Card className="p-6 h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <h3>City Issue Map</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={12} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mockMarkers.map((marker) => {
            const StatusIcon = getStatusIcon(marker.status);
            return (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
                eventHandlers={{ click: () => onMarkerClick(marker.id) }}
              >
                <Popup>
                  <div className="space-y-1">
                    <div className="font-medium">{marker.category}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {marker.status} • {marker.priority} priority
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <StatusIcon className="w-3 h-3" />
                      <span>Click marker for details</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </Card>
  );
}