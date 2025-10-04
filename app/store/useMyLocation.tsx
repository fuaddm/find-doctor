import { create } from 'zustand';

interface MyLocationState {
  myLocation: { lat: number; lng: number } | null;
  setMyLocation: (location: { lat: number; lng: number }) => void;
}

export const useMyLocationStore = create<MyLocationState>()((set) => ({
  myLocation: null,
  setMyLocation: (location) => set(() => ({ myLocation: location })),
}));
