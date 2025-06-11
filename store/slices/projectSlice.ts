import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type ProjectList = {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    owner: object;
}

const initialState = {
    projects: []
}

export const sidebarSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setProjectList: (state, action: PayloadAction<[ProjectList]>) => {
            state.projects = action.payload;
        }
    }

});


export const { setProjectList } = sidebarSlice.actions;

export default sidebarSlice.reducer;