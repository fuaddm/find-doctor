import { Locate, LocateFixed, MapPinned, X } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { cn } from '~/libs/cn';
import { useMyLocationStore } from '~/store/useMyLocation';
import { useSelectedDoctor } from '~/store/useSelectedDoctor';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

const DEFAULT_CORDS = { lat: 40.39663013477836, lng: 49.86679038442161 };

function GeoPanToUser({ mapId }: { mapId: string }) {
  const map = useMap(mapId);
  const myLocation = useMyLocationStore((state) => state.myLocation);
  const setMyLocation = useMyLocationStore((state) => state.setMyLocation);

  function setMapToCenter(showError: boolean = true) {
    if (!map || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude };
        map.panTo(pos);
        map.setZoom(14);
        setMyLocation(pos);
      },
      (err) => {
        if (showError) {
          if (err.code === 1)
            toast.error(
              "Siz yer məlumatına icazə vermədiniz. Zəhmət olmasa brauzer sorğusuna 'İcazə ver' seçin və yenidən cəhd edin."
            );
          if (err.code === 2)
            toast.error(
              'Yer məlumatı hal-hazırda əlçatmazdır. Zəhmət olmasa GPS və ya yerləşmə xidmətlərinin açıq olduğuna və siqnalın güclü olduğuna əmin olun. Daha açıq bir məkanda yenidən cəhd edin.'
            );
          if (err.code === 3)
            toast.error('Mövqe məlumatı vaxtında alınmadı. İnternet bağlantınızı yoxlayın və yenidən cəhd edin.');
        }
        console.error('Geolocation error:', err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  useEffect(() => {
    setMapToCenter(false);
  }, [map]);

  return (
    <div>
      <button
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 py-2 text-center text-white transition hover:bg-teal-700/90"
        onClick={() => setMapToCenter()}
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

export function DoctorsMap() {
  const data = useContext(DoctorsContext);
  const myLocation = useMyLocationStore((state) => state.myLocation);
  const [isSmallMapOpen, setIsSmallMapOpen] = useState(false);

  return (
    <APIProvider apiKey={'AIzaSyDW3qNqDT4ZrF6E3uIoGQOHdB8qhIXkQaE'}>
      <div className="hidden md:block">
        <div className="relative md:sticky md:top-4">
          <GeoPanToUser mapId="pcMap" />
          <div className="h-[400px] w-full overflow-hidden rounded-xl bg-gray-500">
            <Map
              mapId={'pcMap'}
              id="pcMap"
              defaultCenter={DEFAULT_CORDS}
              defaultZoom={13}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapTypeControl={false}
            >
              <FitToMarkers doctors={data} />

              {data.map((doctor: any) => {
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
      <div
        onClick={() => setIsSmallMapOpen((prev) => !prev)}
        className="fixed bottom-8 left-1/2 z-100 h-14 w-14 -translate-x-1/2 rounded-[30px] border-2 border-gray-200 bg-teal-500 md:hidden"
      >
        <MapPinned
          className={cn({
            'absolute top-1/2 left-1/2 -translate-1/2 stroke-teal-50 opacity-100 transition': true,
            '-rotate-180 opacity-0': isSmallMapOpen,
          })}
        />
        <X
          className={cn({
            'absolute top-1/2 left-1/2 -translate-1/2 rotate-180 stroke-teal-50 opacity-0 transition': true,
            'rotate-0 opacity-100': isSmallMapOpen,
          })}
        />
      </div>
      <div
        className={cn({
          'fixed bottom-8 left-1/2 z-99 h-0 w-0 -translate-x-1/2 overflow-hidden transition-all md:hidden': true,
          'h-[400px] w-[calc(100%-40px)] -translate-y-16': isSmallMapOpen,
        })}
      >
        <div
          className={cn({
            'fixed bottom-0 left-1/2 z-10 h-[400px] w-[calc(100vw-40px)] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 opacity-100 transition': true,
            'opacity-0': !isSmallMapOpen,
          })}
        >
          <GeoPanToUser mapId="phoneMap" />
          <div className="h-[320px] w-full overflow-hidden rounded-md bg-gray-500">
            <Map
              mapId={'phoneMap'}
              id="phoneMap"
              defaultCenter={DEFAULT_CORDS}
              defaultZoom={13}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapTypeControl={false}
            >
              <FitToMarkers doctors={data} />

              {data.map((doctor: any) => {
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
  );
}
