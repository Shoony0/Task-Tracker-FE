import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from "@/store/slices/sidebarSlice";
import projectSlice from "@/store/slices/projectSlice";
import updateSlice from "@/store/slices/updateSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    project: projectSlice,
    editData: updateSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

