import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type SidebarPages = 'projects' | 'users' | 'roles' | 'tasks';

type Sidebar = {
    activePage: string;
    isSidebarOpen: boolean;
    userName: string;
}

const initialState = {
    activePage: 'projects',
    isSidebarOpen: false,
}

export const sidebarSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setActivePage: (state, action: PayloadAction<string>) => {
            state.activePage = action.payload;
        },
        setSidebarOpen: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },

});


export const { setSidebarOpen, setActivePage } = sidebarSlice.actions;

export default sidebarSlice.reducer;