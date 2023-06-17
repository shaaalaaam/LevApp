// src/reducers/multiStepFormReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MultiStepFormState {
  step: number;
  formData: any; // Replace with the appropriate type for your form data
}

const initialState: MultiStepFormState = {
  step: 1,
  formData: {},
};

const multiStepFormSlice = createSlice({
  name: 'multiStepForm',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setFormData(state, action: PayloadAction<any>) {
      state.formData = action.payload;
    },
    resetForm(state) {
      state.step = 1;
      state.formData = {};
    },
  },
});

export const { setStep, setFormData, resetForm } = multiStepFormSlice.actions;

export default multiStepFormSlice.reducer;
