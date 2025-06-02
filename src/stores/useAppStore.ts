import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import type { AuthSliceType } from "./authSlice";
import { createAdminSlice, type AdminSliceType } from "./adminSlice";
import { createWaiterSlice, type WaiterSliceType } from "./waiterSlice";

type AppStoreType = AuthSliceType & AdminSliceType & WaiterSliceType

export const useAppStore = create<AppStoreType>((...a) => ({
    ...createAuthSlice(...a),
    ...createAdminSlice(...a),
    ...createWaiterSlice(...a)
}))