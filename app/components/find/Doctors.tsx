import { DoctorsList } from '~/components/find/DoctorsList';
import { useContext, useEffect, useMemo } from 'react';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { RotateCcw } from 'lucide-react';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { useSelectedDoctor } from '~/store/useSelectedDoctor';

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

function FitToMarkers({ doctors }: { doctors: Array<any> }) {
  const map = useMap();
  const doctorId = useSelectedDoctor((state) => state.doctorId);

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

  const positions = useMemo(
    () => doctors?.map((d) => ({ lat: d.hospital.lat, lng: d.hospital.long })) ?? [],
    [doctors]
  );

  useEffect(() => {
    if (!map || positions.length === 0 || !window.google) return;

    if (positions.length === 0) setMapToCenter();

    if (positions.length === 1) {
      map.setCenter(positions[0]);
      map.setZoom(14);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    positions.forEach((p) => bounds.extend(p));
    map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 }); // optional padding
  }, [map, positions]);

  useEffect(() => {
    if (doctorId) {
      const doctor = doctors.find((doctor) => doctor.id === doctorId);
      if (map && doctor) {
        map.panTo({ lat: doctor.hospital.lat, lng: doctor.hospital.long });
        map.setZoom(14);
      }
    }
  }, [doctorId]);

  return null; // this component only adjusts the camera
}

export function Doctors() {
  const data = useContext(DoctorsContext);

  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[450px_1fr]">
      <DoctorsList />

      <APIProvider apiKey={'AIzaSyDW3qNqDT4ZrF6E3uIoGQOHdB8qhIXkQaE'}>
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
                <FitToMarkers doctors={data} />

                {data.map((doctor) => {
                  return (
                    <AdvancedMarker
                      key={doctor.id + 'marker'}
                      position={{ lat: doctor.hospital.lat, lng: doctor.hospital.long }}
                    ></AdvancedMarker>
                  );
                })}
              </Map>
            </div>
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
