import { createSlice, current } from '@reduxjs/toolkit';
const dataSlice = createSlice( {
    name: 'UserMobileMenu',
    initialState: { data: false },
    reducers: {
        show_mobile_menu: ( state ) =>
        {
            state.data = true;
        },
        hide_mobile_menu: ( state ) =>
        {
            state.data = false;
        },

    },
} );

export const { show_mobile_menu, hide_mobile_menu } = dataSlice.actions;
export default dataSlice.reducer;