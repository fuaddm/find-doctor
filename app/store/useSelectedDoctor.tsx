import { create } from 'zustand';

interface DoctorState {
  doctorId: number | null;
  setDoctorId: (id: number) => void;
}

export const useSelectedDoctor = create<DoctorState>()((set) => ({
  doctorId: null,
  setDoctorId: (id) => set(() => ({ doctorId: id })),
}));
