import { Project } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    projects: [] as Project[]
}

export const sidebarSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setProjectList: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        }
    }

});


export const { setProjectList } = sidebarSlice.actions;

export default sidebarSlice.reducer;