import { DoctorsList } from '~/components/find/DoctorsList';
import { useEffect } from 'react';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { RotateCcw } from 'lucide-react';

const DEFAULT_CORDS = { lat: 40.39663013477836, lng: 49.86679038442161 };

function GeoPanToUser() {
  const map = useMap();

  function setMapToCenter() {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.panTo({ lat: coords.latitude, lng: coords.longitude });
        map.setZoom(14);
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
  useEffect(() => {
    setMapToCenter();
  }, [map]);

  return (
    <div>
      <button
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 py-2 text-center text-white"
        onClick={setMapToCenter}
      >
        <RotateCcw size={18} />
        <span>Back to center</span>
      </button>
    </div>
  );
}

export function Doctors() {
  return (
    <div className="relative grid grid-cols-[450px_1fr] gap-6">
      <DoctorsList />

      <APIProvider apiKey={''}>
        <div>
          <div className="sticky top-4">
            <GeoPanToUser />
            <div className="h-[400px] w-full overflow-hidden rounded-xl bg-gray-500">
              <Map
                mapId={'map'}
                defaultCenter={DEFAULT_CORDS}
                defaultZoom={13}
                gestureHandling="greedy"
                disableDefaultUI={false}
                mapTypeControl={false}
              >
                <AdvancedMarker position={DEFAULT_CORDS}>
                  <div className="h-4 w-4 bg-red-500"></div>
                </AdvancedMarker>
              </Map>
            </div>
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
