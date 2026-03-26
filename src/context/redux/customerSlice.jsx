import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  customers: []
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {

    // ✅ Add new customer
    addCustomer: {
      reducer: (state, action) => {
        state.customers.push(action.payload);
      },
      prepare: (customer) => ({
        payload: {
          id: nanoid(),  // auto ID
          ...customer
        }
      })
    },

    // ✅ Update existing customer
    updateCustomer: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.customers.findIndex(c => c.id === id);
      if (index !== -1) {
        state.customers[index] = {
          ...state.customers[index],
          ...updatedData
        };
      }
    },

    // ✅ Delete customer
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        c => c.id !== action.payload
      );
    },

    // ✅ Set all customers (from API)
    setCustomers: (state, action) => {
      state.customers = action.payload;
    }

  }
});

export const {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setCustomers
} = customerSlice.actions;

export default customerSlice.reducer;