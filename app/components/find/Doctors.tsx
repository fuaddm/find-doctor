import { DoctorsList } from '~/components/find/DoctorsList';
import { useContext, useEffect, useMemo } from 'react';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { Locate, LocateFixed } from 'lucide-react';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { useSelectedDoctor } from '~/store/useSelectedDoctor';
import { useMyLocationStore } from '~/store/useMyLocation';

const DEFAULT_CORDS = { lat: 40.39663013477836, lng: 49.86679038442161 };

function GeoPanToUser() {
  const map = useMap();
  const myLocation = useMyLocationStore((state) => state.myLocation);
  const setMyLocation = useMyLocationStore((state) => state.setMyLocation);

  function setMapToCenter() {
    if (!map || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.panTo({ lat: coords.latitude, lng: coords.longitude });
        map.setZoom(14);
        setMyLocation({ lat: coords.latitude, lng: coords.longitude });
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
        {myLocation !== null ? <LocateFixed size={18} /> : <Locate size={18} />}

        <span>Hazırkı mövqeyimə qayıt</span>
      </button>
    </div>
  );
}

function FitToMarkers({ doctors }: { doctors: Array<any> }) {
  const map = useMap();
  const doctorId = useSelectedDoctor((state) => state.doctorId);

  const positions = useMemo(
    () => doctors?.map((d) => ({ lat: d.hospital.lat, lng: d.hospital.long })) ?? [],
    [doctors]
  );

  useEffect(() => {
    if (!map || positions.length === 0 || !window.google) return;

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
  const myLocation = useMyLocationStore((state) => state.myLocation);

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
                {myLocation && (
                  <AdvancedMarker position={myLocation}>
                    <div className="h-3 w-3 rounded-full border-1 border-white bg-blue-500 shadow-[0px_0px_0px_3px_rgba(43,127,255,0.5)]"></div>
                  </AdvancedMarker>
                )}
              </Map>
            </div>
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
