import { create } from "zustand";

export const useUserInfo = create((set) => ({
  userData: null,
  toggleMenu: (data) => set((state) => ({ userData: data })),
  mobileNav: false,
  toggleMobileNav: () => set((state) => ({ mobileNav: !state.mobileNav })),
}));
