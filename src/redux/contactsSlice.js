import { createSlice } from "@reduxjs/toolkit";

import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./operations/operations";

const initialState = {
  name: "contacts",
  initialState: { items: [], isLoading: false, error: null },
};

const contactsSlice = createSlice({
  // Name of the slice
  name: "contacts",
  // Initial state for the slice
  initialState,
  // Reducer functions for handling different actions
  extraReducers: (builder) => {
    // Handle pending state for fetchContacts, addContact, and deleteContact actions
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      });

    // Handle successful fulfillment of fetchContacts action
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    });

    // Handle successful fulfillment of addContact action
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    });

    // Handle successful fulfillment of deleteContact action
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // Find index of the contact to be deleted and remove it from the items array
      const index = state.items.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    });

    // Handle rejected state for fetchContacts, addContact, and deleteContact actions
    builder
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactReducer = contactsSlice.reducer;
