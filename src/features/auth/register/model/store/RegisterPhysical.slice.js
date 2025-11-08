import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    phone: '',
    password: '',
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    birthdate: '',
};

const registerPhysicalSlice = createSlice({
    name: 'register-physical',
    initialState,
    reducers: {
        setRegisterPhysicalData(state, action) {
            Object.assign(state, action.payload);
        },
        clearRegisterPhysicalData() {
            return initialState
        }
    },
});

export const { setRegisterPhysicalData, clearRegisterPhysicalData } = registerPhysicalSlice.actions;
export const registerPhysicalReducer = registerPhysicalSlice.reducer;

