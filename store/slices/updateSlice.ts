import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    projectId: 0,
    taskId: 0,
    userId: 0
}

export const updateSlice = createSlice({
    name: 'editData',
    initialState: initialState,
    reducers: {
        setUpdateProject: (state, action: PayloadAction<[number]>) => {
            state.projectId = action.payload;
        },
        setUpdateTask: (state, action: PayloadAction<[number]>) => {
            state.taskId = action.payload;
        },
        setUpdateUser: (state, action: PayloadAction<[number]>) => {
            state.userId = action.payload;
        },
    }

});


export const { setUpdateProject, setUpdateTask, setUpdateUser } = updateSlice.actions;

export default updateSlice.reducer;