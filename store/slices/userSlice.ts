import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    userRole: []
}

export const userSlice = createSlice({
    name: 'editData',
    initialState: initialState,
    reducers: {
        setUserRole: (state, action: PayloadAction<[string]>) => {
            state.userRole = action.payload;
        },
    }

});


export const { setUserRole } = userSlice.actions;

export default userSlice.reducer;