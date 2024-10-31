import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice( {
    name: 'UserData',
    initialState: {
        data: null
    },
    reducers: {
        add_user_data: ( state, action ) =>
        {
            state.data = action.payload;
        },
        remove_user_data: ( state ) =>
        {
            state.data = null;

        }
    },
} );

export const { add_user_data, remove_user_data } = dataSlice.actions;
export default dataSlice.reducer;