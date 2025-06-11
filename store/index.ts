import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from "@/store/slices/sidebarSlice";
import projectSlice from "@/store/slices/projectSlice";
import updateSlice from "@/store/slices/updateSlice";
import userSlice from "@/store/slices/userSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    project: projectSlice,
    editData: updateSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

