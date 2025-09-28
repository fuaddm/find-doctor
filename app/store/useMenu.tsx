import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
}

export const useMenuStore = create<MenuState>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
